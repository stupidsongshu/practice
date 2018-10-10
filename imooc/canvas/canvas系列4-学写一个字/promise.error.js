console.log('here we go');

new Promise((resolve, reject) => {
  // throw new Error('there is a bug');

  setTimeout(() => {
    // resolve('hello');
    // reject('there is a bug 2');
    throw new Error('there is a bug'); // setTimeout内部通过throw new Error抛出的错误无法在后续catch捕获
  }, 1000);
})
  .then(value => {
    console.log(value + ' world');
  })
  .catch(err => {
    console.log('Error123: ', err.message);
  })