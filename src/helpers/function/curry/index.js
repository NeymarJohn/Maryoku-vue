/**
 * @param {(...args: Arg[]) => Return} executor
 * @param  {Arg[]} parameters
 * @returns {((...args: Arg[]) => Return) | Return}
 * @template Arg
 * @template Return
 */
const curry = (executor, ...parameters) => parameters.length >= executor.length
  ? executor(...parameters)
  : (...nextParameters) => curry(executor, ...parameters, ...nextParameters);

export default curry;
