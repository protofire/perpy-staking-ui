export const MIN_DAYS = 15
export const MAX_DAYS = 180
export const MARKS = Array.from(Array(10).keys()).map((_, value) => ({
  value: MIN_DAYS + ((value + 1) * (MAX_DAYS - MIN_DAYS)) / 10,
}))
