export function arrayUniqueByKey(array, key) {
  return [...new Map(array.map((item) => [item[key], item])).values()];
}
