import pipe           from "../../../function/pipe";
import arrayIsNoEmpty from "../../../array/is/noEmpty";

const objectIsNoEmpty = pipe(Object.keys, arrayIsNoEmpty);
export default objectIsNoEmpty;
