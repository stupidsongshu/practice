console.log('start');
Promise.all([1, 2, 3])
  .then(all => {
    console.log('1:', all);
    return Promise.all([
      function () {
        console.log('123');
      },
      'string',
      true
    ])
  })
  .then(all => {
    console.log('2:', all);
    let p1 = new Promise(resolve => {
      resolve('p1');
    })
    let p2 = new Promise(resolve => {
      resolve('p2');
    })
    return Promise.all([p1, p2]);
  })
  .then(all => {
    console.log('3:', all);
    let p11 = new Promise(resolve => {
      setTimeout(_ => {
        resolve('p11');
      }, 1000);
    });
    let p12 = new Promise((resolve, reject) => {
      setTimeout(_ => {
        reject('p12 rejected');
      }, 1500);
    });
    let p13 = new Promise((resolve, reject) => {
      setTimeout(_ => {
        reject('p13 rejected');
      }, 1200);
    });

    return Promise.all([p11, p12, p13]);
  })
  .then(all => {
    console.log(all);
  })
  .catch(err => {
    console.log('err:', err);
  })