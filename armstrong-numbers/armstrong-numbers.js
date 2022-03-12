
const digits = (n) => [...n.toString()]

const isArmstrongNumber = (number) => {
  const power = digits(number).length;
  const sum = digits(number).map((el) => el ** power).sum()
  return sum === number
}

// utils
Array.prototype.sum = function(f = (x) => x, initial = 0)  {
  return this.reduce((acc, el) => acc + f(el), initial)
}

export {
  isArmstrongNumber as validate
}

