//code here

module.exports = {
    listPatrons: function () {
      fetch('localhost:3000/patrons')
      .then(resp => resp.json())
      .then(data => {
          console.log(data)
      })
    }//,
//    bar: function () {
      // whatever
//    }
  };

// var tools = require('./tools');
// console.log(typeof tools.foo); // => 'function'
// console.log(typeof tools.bar); // => 'function'
// console.log(typeof tools.zemba); // => undefined