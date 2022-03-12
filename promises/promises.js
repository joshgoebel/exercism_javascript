export const promisify = (fn) => {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (error, data) => {
        if (error) return reject(error)
        resolve(data)
      }
    )});
};

export const all = (promises) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    let results = []
    promises.forEach((p,i) => {
      p.then((x) => {
        results[i] = x;
        count++;
        if (count === promises.length) {
          resolve(results)
        }
      }).catch(reject);
    })
  })
};

export const all = (promises) => // {
  promises.reduce(
    async (acc, promise) => (await acc).concat(await promise),
    Promise.resolve([])
  );
  // return new Promise((resolve, reject) => {
  //   resolve(promises.map(async x => {
  //     await x
  //   }))
  // })
  // await async () => { promises.map(async x => {
  //   await x
  // }))}
// }

export const allSettled = (promises) => {
  return new Promise((resolve, reject) => {
    let count = promises.length;
    let results = []
    promises.forEach((p,i) => {
      let h = (x) => {
        results[i] = x;
        if (--count === 0) {
          resolve(results)
        }
      };
      p.then(h,h);
    })
  })
};

export const race = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach(p => p.then(resolve,reject))
  })
};

// export const any = (promises) => {
//   return new Promise((resolve, reject) => {
//     let count = 0;
//     let results = []
//     promises.forEach((p,i) => {
//       p.then((x) => {
//         resolve(x)
//       }).catch(x =>{
//         results[i] = x;
//         count++;
//         if (count === promises.length) {
//           reject(results)
//         }
//       });
//     })
//   })
// };

export const any = (promises) =>
  new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve).catch(() => null);
    });
    allSettled(promises).then(reject);
  });
