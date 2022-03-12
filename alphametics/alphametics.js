//
// This is only a SKELETON file for the 'Alphametics' exercise. It's been provided as a
// convenience to get you started writing code faster.


function perm(n, acc=[],depth) {
    if (n==0) {
    console.log("here", acc)
    return
    }
  for (let i = 0; i<10; i++) {
    perm(n-1, acc.concat(i), depth+1)
  }
}

export const solve = (puzzle) => {
  perm(2,[],0)
};
