export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const findDuplicate = (arr: Array<any>) => {
  return arr.reduce((acc, currentValue, index, array) => {
    if (array.indexOf(currentValue) !== index && !acc.includes(currentValue))
      acc.push(currentValue);
    return acc;
  }, []);
};
