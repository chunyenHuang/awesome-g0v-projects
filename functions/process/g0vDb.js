const fetch = require('node-fetch');

module.exports = async () => {
  const url = 'https://sheets.googleapis.com/v4/spreadsheets/1C9-g1pvkfqBJbfkjPB0gvfBbBxVlWYJj6tTVwaI5_x8/values/%E5%A4%A7%E6%9D%BE%E6%8F%90%E6%A1%88%E5%88%97%E8%A1%A8!A1:W10000?key=AIzaSyBhiqVypmyLHYPmqZYtvdSvxEopcLZBdYU'; // eslint-disable-line
  const res = await fetch(url);
  const { values } = await res.json();

  const headers = values.shift().map((x) => x.replace(/ /g, '_'));

  const data = values
    .map((row, rowIndex) => {
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
    })
    .sort((a, b) => a.date > b.date ? -1 : 1);

  return {
    url,
    data,
  };
};
