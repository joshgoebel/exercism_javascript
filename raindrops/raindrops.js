//
// This is only a SKELETON file for the 'Raindrops' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const divisibleBy = (num, d) => num % d === 0

const sounds = new Map(
  [[3, 'Pling'],
  [5, 'Plang'],
  [7, 'Plong']]
)

export const convert = (num) => {
  // let out = "";
  // if (divisibleBy(num, 3)) out += "Pling";
  // if (divisibleBy(num, 5)) out += "Plang";
  // if (divisibleBy(num, 7)) out += "Plong";
  let out = [...sounds.entries()]
    .filter(([factor,_]) => divisibleBy(num, factor))
    .map(([_,sound]) => sound).join("")

  if (out === "")
    out = String(num);

  return out;
};
