// @ts-check

import curry from "../../function/curry";
import arrayMaximumOf from "./of";
import arrayMaximumCore from "./core";

/**
 * @param {Executor} executor
 * @param {Value[]} array
 * @returns {number}
 * @template Value
 * @template {(value: Value) => number} Executor
 */
const arrayMaximumDef  = curry(arrayMaximumCore);
const arrayMaximum     = Object.assign(arrayMaximumDef, {
  of   : arrayMaximumOf,
  core : arrayMaximumCore
});

export default arrayMaximum;
