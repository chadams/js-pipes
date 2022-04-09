// Chunk an array into smaller arrays of a specified size
export const chunk = (arr: Array<any>, size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};
