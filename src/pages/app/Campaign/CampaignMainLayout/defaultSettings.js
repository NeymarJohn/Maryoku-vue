const date = new Date();
const sentTime = date.getTime();
const defaultPart = {
  selected: false,
  sentTime,
  excelFileName: "",
  excelFilePath: "",
};

const defaultSettings = {
  phone: {
    ...defaultPart,
    numberString  : "",
    smsOrWhatsapp : "",
    numberArray   : [],
  },
  email: {
    ...defaultPart,
    subject       : "",
    from          : "",
    addressString : "",
    addressArray  : [],
  },
};

export default defaultSettings;
