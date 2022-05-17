// @ts-check
/**
 * @param {Executor} executor
 * @param {Value[]} array
 * @returns {number}
 * @template Value
 * @template {(value: Value) => number} Executor
 */
 const arrayMaximumCore = (executor, array) => {
  const { length } = array;
  if (length > 0) {
    let maximum = executor(array[0]);
    let index = 1;
    while (index < length) {
      const value = executor(array[index]);
      if (value > maximum) maximum = value;
      index++;
    }
    return maximum;
  }

  return -Infinity;
};

export default arrayMaximumCore;
