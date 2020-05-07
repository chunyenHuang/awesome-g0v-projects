const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const similarity = require('similarity');

jest.setTimeout(5 * 60 * 1000);

// const REQUEST_WAIT_TIME = 300;

const dataDir = path.join(__dirname, '../data');

describe('Test data format', () => {
  const checkCsvFormat = async (filename, headerString, primaryKey, required) => {
    const items = await csv().fromFile(path.join(dataDir, filename));
    const existsKeys = {};

    const errors = [];

    items.forEach((item) => {
      expect(Object.keys(item).join(','), item).toEqual(headerString);
      if (existsKeys[item[primaryKey]]) {
        errors.push(`${item[primaryKey]} is duplicated`);
      }
      existsKeys[item[primaryKey]] = true;

      required.forEach((key) => {
        expect(item[key].length, `${key} is required.`).toBeGreaterThan(0);
      });

      headerString.split(',').forEach((key) => {
        if (key === 'github_repos') {
          item[key].split(',').filter((x) => x)
            .forEach((repo) => {
              expect(repo.includes('/'), `Invalid github repo format: ${repo} should be [:owner/:repo]`).toEqual(true);
            });
        }
      });
    });

    if (errors.length > 0) {
      console.log(errors);
      throw new Error();
    }
  };

  test('*.csv', async () => {
    const files = [{
      filename: 'tags.csv',
      headerString: 'source,name,name_en,description,description_en',
      primaryKey: 'name',
      required: ['name'],
    }, {
      filename: 'owners.csv',
      headerString: 'source,name,github_id,slack_id,email',
      primaryKey: 'name',
      required: ['name'],
    }, {
      filename: 'projects.csv',
      headerString: 'source,name,description,g0v_db_rows,owners,tags,github_repos,homepage',
      primaryKey: 'name',
      required: ['name', 'owners', 'tags'],
    }];

    await Promise.all(files.map(({ filename, headerString, primaryKey, required }) => {
      return checkCsvFormat(filename, headerString, primaryKey, required);
    }));
  });
});

describe('Test Projects', () => {
  test('Data link', async () => {
    const getG0vDdData = async () => {
      const cacheFile = path.join(__dirname, `g0vDb.json`);
      if (fs.existsSync(cacheFile)) {
        return require(cacheFile);
      }

      const url = 'https://sheets.googleapis.com/v4/spreadsheets/1C9-g1pvkfqBJbfkjPB0gvfBbBxVlWYJj6tTVwaI5_x8/values/%E5%A4%A7%E6%9D%BE%E6%8F%90%E6%A1%88%E5%88%97%E8%A1%A8!A1:W10000?key=AIzaSyBhiqVypmyLHYPmqZYtvdSvxEopcLZBdYU'; // eslint-disable-line
      const res = await fetch(url);
      const { values } = await res.json();

      const headers = values.shift().map((x) => x.replace(/ /g, '_'));

      const data = values.map((row, rowIndex) => {
        return headers.reduce((obj, header, index) => {
          row[index] = row[index] || '';
          if (['manpower', 'three_brief', 'tags', 'license_data'].includes(header)) {
            obj[header] = row[index]
              .replace(/[.,、，；\\/](\s+)?/g, ',')
              .split(',');
          } else {
            obj[header] = row[index];
          }
          obj.row = rowIndex + 2; // header + index
          return obj;
        }, {});
      });

      fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2));
      return data;
    };

    const [
      tags,
      owners,
      projects,
      db,
    ] = await Promise.all([
      csv().fromFile(path.join(dataDir, 'tags.csv')),
      csv().fromFile(path.join(dataDir, 'owners.csv')),
      csv().fromFile(path.join(dataDir, 'projects.csv')),
      getG0vDdData(),
    ]);

    let logs = [];

    const hasMappedProjectRows = [];

    projects.forEach((project) => {
      // check tags
      project.tags.split(',').filter((x) => x).forEach((tag) => {
        expect(tags.find((x) => x.name === tag), `${tag} does not exist in tags.csv`).toBeDefined();
      });

      // check owners
      project.owners.split(',').filter((x) => x).forEach((owner) => {
        expect(owners.find((x) => x.name === owner), `${owner} does not exist in owner.csv`).toBeDefined();
      });

      // check db relations
      const targetScore = 0.6;
      const rowNums = project.g0v_db_rows.split(',').filter((x) => x).map((x) => parseInt(x));
      const checkedRowNums = [];
      const potentialRows = [];
      db.forEach((data) => {
        const compareStringScore = similarity(project.name, data.project);
        if (rowNums.includes(data.row)) {
          if (compareStringScore < targetScore) {
            logs.push(` - Too much diff (${compareStringScore.toFixed(2)}): ${project.name} - "${data.project}" (row: ${data.row})`);
          }
          hasMappedProjectRows.push(data.row);
          checkedRowNums.push(data.row);
        } else
        if (compareStringScore > targetScore) {
          logs.push(` - Potential match: ${project.name} - "${data.project}" (row: ${data.row})`);
          potentialRows.unshift(data.row);
        }
      });

      // if (potentialRows.length > 0) {
      //   logs.push(`Consider adding these to "${project.name}" g0v_db_rows: "${potentialRows.join(',')}"`);
      // }

      rowNums.forEach((rowNum) => {
        expect(checkedRowNums.includes(rowNum), `${rowNum} does not exist in g0v db`).toBeDefined();
      });
    });

    const unprocessedLogs = [];
    const unprocessed = [];
    db.forEach((data) => {
      if (!hasMappedProjectRows.includes(data.row)) {
        unprocessedLogs.push(`${data.project.replace(/\n/g, '')} (row:${data.row}) is not in the list.`);
        unprocessed.push(data);
      }
    });

    unprocessedLogs.sort((a, b) => a > b ? 1 : -1);

    logs = [...logs, ...unprocessedLogs];

    console.log(logs);

    fs.writeFileSync(path.join(__dirname, 'log.txt'), logs.join('\n'));

    const sanitize = (string) => {
      return string.replace(/\r/g, ' ').replace(/\n/g, ' ');
    };
    const allOwners = [];
    const allTags = [];
    fs.writeFileSync(path.join(__dirname, 'proposals.csv'), unprocessed.map((item) => {
      // source,name,description,g0v_db_rows,owners,tags,github_repos,homepage
      item.tags.forEach((tag) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
      item.owner_name
        .replace(/, +?/g, ',')
        .split(',')
        .forEach((owner) => {
          if (!allOwners.includes(owner)) {
            allOwners.push(owner);
          }
        });
      return [
        `"g0v_db"`,
        `"${sanitize(item.project)}"`,
        `"${item.row}"`,
        `"${sanitize(item.owner_name.replace(/, +?/g, ',')) || 'unknown'}"`,
        `"${item.tags.filter((x)=>x).join(',') || '待確認'}"`,
        `"${sanitize(item.guideline)}"`,
      ].join(',');
    }).sort((a, b) => a > b ? 1 : -1).join('\n'));

    fs.writeFileSync(path.join(__dirname, 'proposals-owners.csv'), allOwners.map((item) => {
      return `"g0v_db","${item}",,,`;
    }).sort((a, b) => a > b ? 1 : -1).join('\n'));

    fs.writeFileSync(path.join(__dirname, 'proposals-tags.csv'), allTags.map((item) => {
      return `"g0v_db","${item}",,,`;
    }).sort((a, b) => a > b ? 1 : -1).join('\n'));
  });
});
