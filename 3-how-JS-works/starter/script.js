///////////////////////////////////////
// Lecture: Hoisting


const arr = [1, 2, 3, 4, NaN];

if (arr.includes(3)) {
  console.log(true);
}

arr.includes(NaN);

const cars = {BMW:3, Toyota:2, Tesla:1};
const values = Object.values(cars);

console.log(values);

for (let [key, value] of Object.entries(cars)) {
  console.log(`key: ${key}, value: ${value}`);
}

const map = new Map(Object.entries(cars));
console.log(map);

function getAmount(userId){
  getUser(userId)
  .then(getBankBalance)
  .then(amount => {
    console.log(amount);
  });
}

async function getAmount2(userId){
  var user = await getUser(userId);
  var amount = await getBankBalance(user);
  console.log(amount);
}

function getAmount3(userId){
  getUser(userId)
  .then(getBankBalance)
  .then(amount => {
    console.log(amount);
  });
}

getAmount('1');
getAmount2('1');
getAmount3('1');

function getUser(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('John');
    }, 1000);
  });
}

function getBankBalance(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user === 'John') {
        resolve('$1000');
      } else {
        reject('unknown');
      }
    }, 1000)
  });
}

//Option 1 - Use try catch within the function
async function doubleAndAdd(a, b) {
 try {
  a = await doubleAfter1Sec(a);
  b = await doubleAfter1Sec(b);
 } catch (e) {
  return NaN; //return something
 }

return a + b;
}
//🚀Usage:
doubleAndAdd('one', 2).then(console.log); // NaN
doubleAndAdd(1, 2).then(console.log); // 6

function doubleAfter1Sec(param) {
 return new Promise((resolve, reject) => {
  setTimeout(function() {
   let val = param * 2;
   isNaN(val) ? reject(NaN) : resolve(val);
  }, 1000);
 });
}

//Option 2 - *Catch* errors on  every await line
//as each await expression is a Promise in itself
async function doubleAndAdd(a, b) {
 a = await doubleAfter1Sec(a).catch(e => console.log('"a" is NaN')); // 👈
 b = await doubleAfter1Sec(b).catch(e => console.log('"b" is NaN')); // 👈
 if (!a || !b) {
  return NaN;
 }
 return a + b;
}

//🚀Usage:
doubleAndAdd('one', 2).then(console.log); // NaN  and logs:  "a" is NaN
doubleAndAdd(1, 2).then(console.log); // 6

function doubleAfter1Sec(param) {
 return new Promise((resolve, reject) => {
  setTimeout(function() {
   let val = param * 2;
   isNaN(val) ? reject(NaN) : resolve(val);
  }, 1000);
 });
}

//Option 3 - Dont do anything but handle outside the function
//since async / await returns a promise, we can catch the whole function's error
async function doubleAndAdd(a, b) {
 a = await doubleAfter1Sec(a);
 b = await doubleAfter1Sec(b);
 return a + b;
}

//🚀Usage:
doubleAndAdd('one', 2)
.then(console.log)
.catch(console.log); // 👈👈🏼<------- use "catch"

function doubleAfter1Sec(param) {
 return new Promise((resolve, reject) => {
  setTimeout(function() {
   let val = param * 2;
   isNaN(val) ? reject(NaN) : resolve(val);
  }, 1000);
 });
}

///////////////////////////////////////
// Lecture: Scoping



// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword
