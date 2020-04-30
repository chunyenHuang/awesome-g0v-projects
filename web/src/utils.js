export const sortByKey = (key, reverse = false) => {
  const v = reverse ? -1 : 1;
  return (a, b) => {
    return a[key] > b[key] ? 1 * v : -1 * v;
  };
};
