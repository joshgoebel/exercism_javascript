// first pass, I wanted to try a "performant" solution that tried to solve
// this with a bit more math rather than just creating huge rails/arrays in
// RAM and then solving it literally

import { zigzagLoop, cycle } from "./util";

// given input text, a rails starting offset, and the skip sizes will
// return the content of the coded rails by walking the original string and
// just  pulling characters from the specified offsets
//
// for example to generate the 3rd of 4 rails:
//
// . . ? . ? . . . ? . ? . . . ? . ? . . . ? . ?
//
// - offset is 2 (skip the first two characters of text)
// - skipA is 2
// - skipB is 4
const rail = (text, {offset, skips }) => {
  let result = ""
  let i = offset;
  skips = cycle(skips)
  while (text[i] !== undefined) {
    let skip = skips.next().value;
    if (skip === 0 ) continue;

    result += text[i];
    i += skip;
  }
  return result;
}

// takes plain text and returns the individual coded rails, note: all this
// really does is calculate the start offset and skip lengths for each rail
// and then defers to `rail` to walk the text and generate the rail itself
const railsFrom = (text, railCount) => {
  let skipA = (railCount - 1) * 2;
  let skipB = 0;
  return new Array(railCount).fill().map((_,i) => {
    let result = rail(text, {offset: i, skips: [skipA, skipB]})
    skipA -= 2;
    skipB += 2;
    return result
  })
}

export const encode = (text, railCount) => {
  return railsFrom(text,railCount).join("")
};

// takes a coded text and splits it into the original
// rails (still coded),  One can then walk the rails
// in a zig-zag to decode
const splitRailContents = (text, railCount) => {
  return railsFrom(text,railCount)
    .map(x => x.length)
    .reduce((acc, len) => {
      acc.push(text.slice(0, len))
      text = text.slice(len)
      return acc
    }, [])
}

export const decode = (text, railCount) => {
  // reverse so we can use pop in our loop to read the strings in forward order
  let railContents = splitRailContents(text, railCount).map(x => [...x].reverse() );
  let result = ""
  // console.log(lengths)
  // console.log(railContents)
  zigzagLoop({
      between: [0, railCount-1],
      while: i => railContents[i].length > 0
    }, i => {
      result += railContents[i].pop()
    }
  );
  return result;
};
