// https://simple.wikipedia.org/wiki/Gigasecond
const ONE_GIGASECOND = 1e9; // one billion seconds
const toMilliseconds = (n) => n * 1000

export const gigasecond = date =>
  new Date(date.getTime() + toMilliseconds(ONE_GIGASECOND) )

