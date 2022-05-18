/**
 * @param {ArrayLike<any>} array
 * @returns {number}
 */

import arrayIsNoEmpty from "../../is/noEmpty";

const arrayLastIndex = (array) => arrayIsNoEmpty(array) ? array.length - 1 : -1;
export default arrayLastIndex;
