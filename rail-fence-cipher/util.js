export const zigzagLoop = (opts, iter) => {
  const whileFn = opts["while"];
  const [start, stop] = opts.between;

  let dir = +1
  let i = start
  while (whileFn(i)) {
    iter(i);
    i += dir;
    if (i < start || i > stop ) {
      dir = dir * -1;
      i += dir + dir;
    }
  }
}

export function *cycle(list) {
  let i = 0;
  while (true) {
    yield list[i];
    i++;
    if (i === list.length) i = 0;
  }
}