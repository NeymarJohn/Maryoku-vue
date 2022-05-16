const curry = (executor, ...parameters) => parameters.length >= executor.length
  ? executor(...parameters)
  : (...nextParameters) => curry(executor, ...parameters, ...nextParameters);
export default curry;
