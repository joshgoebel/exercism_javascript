//
// This is only a SKELETON file for the 'Acronym' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const SPACE_LIKE_CHARACTERS = /[-]/
const NON_ALPHA = /[^a-zA-Z ]/
const MULTI_LETTER_WORDS = /([a-z])([A-Z])/g

export const parse = (str) => {
  if (str.trim() === "") return "";

  return str
    .replace(SPACE_LIKE_CHARACTERS," ")
    .replace(NON_ALPHA,"") // remove all other non-characters
    .replace(MULTI_LETTER_WORDS, "$1 $2" )
    .match(/\b(\w)/g)
    .join("").toUpperCase();
};
