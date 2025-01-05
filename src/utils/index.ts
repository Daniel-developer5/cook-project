export const getAverage = (nums: number[]): number => {
  return +(nums.reduce((sum, n) => sum + n, 0) / nums.length).toFixed(1)
}
