const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');

const { parse } = require('../functions/process/helper');

describe('Process Helper', () => {
  it('parse', async () => {
    const jsonObj = await csv().fromFile(path.join(__dirname, '../data/projects.csv'));
    const result = await parse(jsonObj);

    fs.writeFileSync(path.join(__dirname, 'result.json'), JSON.stringify(result, null, 2));
  });
});
