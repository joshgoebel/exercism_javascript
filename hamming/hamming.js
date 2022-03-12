//
// This is only a SKELETON file for the 'Hamming' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const compute = (stranda, strandb) => {
    var distance = 0;

    for (var i = 0; i < stranda.length; i++) {
      var a = stranda.charAt(i);
      var b = strandb.charAt(i);
      if (a != b) {
        // distance = distance + 1;
        distance += 1;
      }
    }

  return distance
};