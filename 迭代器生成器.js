var myObj ={
  a: 1,
  b: 2
}
Object.defineProperty(myObj, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    var obj = this
    var index = 0
    var ks = Object.keys(obj)
    return {
      next: function() {
        return {
          value: obj[ks[index++]],
          done: index > ks.length
        }
      }
    }
  }
})

var it = myObj[Symbol.iterator]()
it.next()


// function fn() {
//   var _value = 0
//   return {
//     next: function() {
//       _value += 1
//       if(_value === 5) {
//         return { value: _value, done: true }
//       } else {
//         return { value: _value, done: false }
//       }
      
//     }
//   }
// }

// function* fn2() {
//   var value = 0
//   while(true) {
//     value += 1
//     //yeild 理解为退让
//     yield value 
//   }
// }
// a = fn2()
// a.next()

// //自己实现迭代，让object也可以迭代
// var obj = {
//   name: 'zhangsan',
//   age: 18,
//   sex: 'man'
// }
// obj[Symbol.iterator] = function* () {
//   var keys = Object.keys(obj)
//   for(var i = 0; i < keys.length; i++) {
//     yield obj[keys[i]]
//   }
// }
// for(key of obj) {
//   console.log(key)
// }

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log('res1', result);
  console.log('res2', yield fetch('https://api.myjson.com/bins/yd9my'))
}
var g = gen();
g.next().value.then(function(){
  
}).then(function(){
  // console.log(data1)
  g.next(1111).value.then(function(da){
    g.next(da);
    console.log(g.next())
  });
});