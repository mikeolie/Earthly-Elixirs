export default (file: File): boolean => {
  const validTypes: string[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/x-icon",
  ];
  if (validTypes.indexOf(file.type) === -1) {
    return false;
  }
  return true;
};
