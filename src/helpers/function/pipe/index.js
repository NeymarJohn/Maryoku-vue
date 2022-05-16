/**
 * @param {(...args: Args) => R1} f
 * @param {(arg: R1) => R2} f2
 * @param  {FS} functions
 * @returns {(...args: Args) => FS extends readonly [...any[], infer Last] ? ReturnType<Last> : R2}
 * @template {any[]} Args
 * @template R1
 * @template R2
 * @template {[(arg: R2) => any, ...((arg: any) => any)] | (arg: any) => any)[]} FS
 */
const pipe = (f, f2, ...functions) => {
  return (...args) => {
    let result = f2(f(...args));
    const { length } = functions;
    if (length > 0) {
      let index = 0;
      while (index < length) {
        result = functions[index](result);
        index++;
      }
    }

    return result;
  };
};

export default pipe;
