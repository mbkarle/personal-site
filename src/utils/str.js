export const capitalize = (str) =>
  str?.charAt(0)?.toUpperCase() + str?.substring(1);

export const copyToClipboard = (text) => {
  const type = "text/plain";
  const data = [new ClipboardItem({ [type]: new Blob([text], { type }) })];
  return navigator?.clipboard?.write(data);
};

copyToClipboard;
