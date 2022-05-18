import curry       from "../../function/curry";
import maximumCore from "./core";

const maximum = curry(maximumCore);
export default maximum;
