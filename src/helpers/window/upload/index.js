export const uploadFiles = (onchange, config = {
  multiple: true,
}) => {
  const input    = document.createElement("input");
  for (const key in config) input[key] = config[key];
  input.type     = "file";
  input.click();
  input.onchange = ({ target }) => onchange(target.files);
};
