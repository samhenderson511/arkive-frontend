export function sortClothingSizes(
  sizes: { value: string; label: string; count: number; isRefined: boolean }[]
) {
  // Define the basic order for standard sizes and special categories
  const baseOrder = ["xs", "s", "s/m", "m", "m/l", "l", "xl", "xxl", "o/s"];

  // Helper to determine if a size is numeric-letter combination
  function isNumericLetter(size: string) {
    return /\d+[SRL]/.test(size.toUpperCase());
  }

  // Convert numeric-letter sizes to a comparable numeric value
  function numericLetterValue(size: string) {
    const numericPart = parseInt(size, 10);
    const letterPart = size.slice(-1).toUpperCase();
    const modifier =
      letterPart === "S" ? 0.1
      : letterPart === "R" ? 0.2
      : 0.3;
    return numericPart + modifier;
  }

  // Determine the sorting value of each size
  function sortingValue(size: string) {
    const lowerCaseSize = size.toLowerCase();
    const baseIndex = baseOrder.indexOf(lowerCaseSize);
    if (baseIndex !== -1) {
      return baseIndex;
    } else if (isNumericLetter(lowerCaseSize)) {
      // For numeric-letter combinations, use a value starting after the last baseOrder index
      return baseOrder.length + numericLetterValue(lowerCaseSize);
    } else if (!isNaN(Number(lowerCaseSize))) {
      // Purely numeric sizes are sorted after all named sizes but before numeric-letter combinations
      return baseOrder.length + parseInt(lowerCaseSize, 10);
    }
    // Fallback for unexpected sizes
    return Number.MAX_VALUE;
  }

  // Sort the sizes based on their calculated sorting values
  return sizes.sort((a, b) => sortingValue(a.value) - sortingValue(b.value));
}
