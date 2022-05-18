const loop = (count = 0, callback = () => null) => {
  let index = 0;
  while (index < count) {
    callback(index);
    index++;
  }
};

export default loop;
