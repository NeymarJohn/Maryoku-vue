/**
 * @param {number[]} array
 * @returns {number}
 */
const arrayMaximumOf = (array) => {
  const { length } = array;
  if (length > 0) {
    let maximum = array[0];
    let index = 1;
    while (index < length) {
      const value = array[index];
      if (maximum < value) maximum = value;
      index++;
    }

    return maximum;
  }

  return -Infinity;
};

export default arrayMaximumOf;
