export const isEmptyObject = (obj: Record<string, any>): boolean => {
  return !Object.keys(obj).length;
};
