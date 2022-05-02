const arrayLimit = (maxLength, array) => {
  const { length } = array;
  if (length > maxLength) {
    const limited = new Array(maxLength);
    let index = 0;
    while (index < maxLength) {
      limited[index] = array[index];
      index++;
    }
    return limited;
  }

  return array;
};

export default arrayLimit;
