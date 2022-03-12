// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Determines how long it takes to prepare a certain juice.
 *
 * @param {string} name
 * @returns {number} time in minutes
 */
export function timeToMixJuice(name) {
  switch(name) {
    case 'Pure Strawberry Joy':
      return 0.5;
    case 'Energizer':
    case 'Green Garden':
      return 1.5;
    case 'Tropical Island':
      return 3;
    case 'All or Nothing':
      return 5;
    default:
      return 2.5
  }
}

const wedgesFromLime = (lime) => { return { small: 6, medium: 8, large: 10}[lime] };

/**
 * Calculates the number of limes that need to be cut
 * to reach a certain supply.
 *
 * @param {number} wedgesNeeded
 * @param {string[]} limes
 * @returns {number} number of limes cut
 */

export function limesToCut(wedgesNeeded, limes) {
  let cut = 0;
  while (wedgesNeeded > 0 && limes[cut]) {
    wedgesNeeded -= wedgesFromLime(limes[cut]);
    cut += 1;
  }
  return cut;
}

export function limesToCut(wedgesNeeded, limes) {
  let cut = 0;
  for (let lime of limes) {
    if (wedgesNeeded <= 0) break;
    wedgesNeeded -= wedgesFromLime(lime);
    cut += 1;
  }
  return cut;
}

/**
 * Determines which juices still need to be prepared after the end of the shift.
 *
 * @param {number} timeLeft
 * @param {string[]} orders
 * @returns {string[]} remaining orders after the time is up
 */
export function remainingOrders(timeLeft, orders) {
  while (timeLeft > 0) {
    timeLeft -= timeToMixJuice(orders.shift())
  }
  return orders;
}
