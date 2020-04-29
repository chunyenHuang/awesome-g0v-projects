module.exports = {
  groupArrayByCount,
  fixJSONString,
};

/**
 * @memberof module:utils
 * @summary split array items to grouped items
 * @param {Array} inArray
 * @param {number} inCount
 * @return {Array<Array>}
 */
function groupArrayByCount(inArray = [], inCount) {
  if (inCount <= 0) {
    return inArray;
  }
  const result = [];
  let currentGroupIndex = -1;
  inArray.forEach((item, index) => {
    if (index % inCount === 0) {
      currentGroupIndex++;
      result.push([]);
    }

    result[currentGroupIndex].push(item);
  });

  return result;
}

function fixJSONString(input = '') {
  if (typeof input !== 'string') {
    return input;
  }

  let data;
  let error;
  try {
    data = JSON.parse(input);
  } catch (e) {
    error = e;

    // try common error fix
    try {
      const fixedString = input
        .replace(/\r?\n|\r/g, '')
        .replace(/\s\s+/g, ' ') // extra white space
        .replace(/,(\s+)?}/g, '{') // ,}
        .replace(/,(\s+)?\]/g, ']') // ,]
        .replace(/\](\s+)?"/g, '],"') // ]"
        .replace(/}(\s+)?"/g, '},"'); // }"

      data = JSON.parse(fixedString);
    } catch (e) {
      console.log('... can not auto fix', e);
    }
    data = {};
  }

  return { data, error };
}
