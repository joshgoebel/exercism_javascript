export const steps = (n) => {
  if (n<=0) {
    throw("Only positive numbers are allowed")
  }

  let steps = 0
  while (n !== 1) {
    if (isEven(n)) {
        n /= 2;
      } else { // odd
        n = 3 * n + 1;
      }
    steps++;
  }

  return steps;

  // recursive
  // return collatz(number, 0)
};

const isEven = (n) => n % 2 === 0

// const collatz = (n, steps) => {
//   if (n === 1) { return steps; }

//   if (n % 2 === 0) {
//     n /= 2;
//   } else {
//     n = 3 * n + 1;
//   }
//   return collatz(n, steps+1)
// }
