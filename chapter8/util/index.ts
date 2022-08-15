export const defaultToString = (item: any): string => {
  if (item === null) {
    return 'NULL';
  }

  if (item === undefined) {
    return 'UNDEFINED';
  }

  if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }

  return item.toString();
};