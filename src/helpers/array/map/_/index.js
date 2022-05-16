const _arrayMap = (callback, array) => {
  const { length = 0 } = array;
  let index = 0;
  const mapped = new Array(length);
  while (index < length) {
    const value = array[index];
    mapped[index] = callback(value, index, array);
    index++;
  }
  return mapped;
};

export default _arrayMap;
