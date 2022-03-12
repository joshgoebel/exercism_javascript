const setBit = (x) => 2 ** x

const EVENTS = [
  [ setBit(0), (list) => list.push("wink") ],
  [ setBit(1), (list) => list.push("double blink") ],
  [ setBit(2), (list) => list.push("close your eyes") ],
  [ setBit(3), (list) => list.push("jump") ],
  [ setBit(4), (list) => list.reverse() ]
]

export const commands = (value) => {
  let acc = []
  EVENTS.forEach(([bitmask, action]) => {
    if (value & bitmask) action(acc)
  })
  return acc
};
