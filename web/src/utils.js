export const sortByKey = (key, reverse = false) => {
  return (a, b) => {
    // equal items sort equally
    if (a[key] === b[key]) {
      return 0;
    } else
    if (a[key] === void(0)) {
      return 1;
    } else
    if (b[key] === void(0)) {
      return -1;
    } else
    if (!reverse) {
      // otherwise, if we're ascending, lowest sorts first
      return a[key] < b[key] ? -1 : 1;
    } else {
      // if descending, highest sorts first
      return a[key] < b[key] ? 1 : -1;
    }
  };
};
