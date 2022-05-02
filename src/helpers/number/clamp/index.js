/**
 *
 * @param    {Minimum} minimum
 * @param    {Maximum} maximum
 * @param    {Value} value
 * @returns  {Minimum | Maximum | Value}
 * @template {number} Minimum
 * @template {number} Maximum
 * @template {number} Value
 */
const numberClamp = (minimum, maximum, value) => minimum >= value ? minimum : maximum <= value ? maximum : value;
export default numberClamp;
