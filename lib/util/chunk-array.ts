export function chunkArray(array: string[], size: number) {
  const chunkedArr: string[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size))
  }
  return chunkedArr
}
