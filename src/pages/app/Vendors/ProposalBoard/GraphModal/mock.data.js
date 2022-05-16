const preset   = ["30 Apr", "5 Apr", "4 Apr", "6 Apr", "8 Apr", "1 Apr", "2 Apr"];
const inPreset = Array.from(preset        , (_, index) => index * 10 + index);
const useDate  = Array.from({ length: 10 }, (_, index) => `1${index} Apr`);

const dates    = [...preset,   ...useDate];
const proposal = [...inPreset, ...useDate.map(() => ~~(Math.random() * 100) - 1)];
const system   = [...inPreset, ...useDate.map(() => ~~(Math.random() * 100) - 1)];
const vendor   = [...inPreset, ...useDate.map(() => ~~(Math.random() * 100) - 1)];

const mock = {
  dates,
  proposal,
  system,
  vendor
};

export default mock;
