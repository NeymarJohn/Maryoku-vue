// @ts-check

/**
* @param {(x1: Value, x2: Value) => any} executor
* @param {Value[]} array
* @template Value
*/
const _arraySort = (executor, array) => {
  const { length } = array;
  switch (length) {
    case 0  : return [];
    case 1  : return [array[0]];
    case 2  : return (executor(array[0], array[1]) < 0 ? [array[0], array[1]] : [array[1], array[0]]);
    default : {
      const sorted  = new Array(length);
      const stop    = length;
			let index     = 0;
			let nextIndex = 1;
      while (nextIndex < stop) {
        const x1 = array[index], x2 = array[nextIndex];
        if (executor(x1, x2) < 0) {
          sorted[index]     = x1;
          sorted[nextIndex] = x2;
        } else {
          sorted[index]     = x2;
          sorted[nextIndex] = x1;
        }
        index     += 2;
        nextIndex += 2;
      }
      if (array[index]) sorted[index] = array[index];
      return sorted.sort(executor);
    }
  }
};

export default _arraySort;
