console.log("hello");

//global object
// console.log(global);

// comment1
/* const os = require('os');
const path = require('path');


console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log("path");
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));


console.log(path.parse(__filename)); */



/* const math = require('./math');
console.log(math.add(2,5)); */

const {add, sub,multi,div} = require('./math');
console.log(add(2,5));
console.log(sub(2,10));
console.log(multi(2,10));
console.log(div(10,2));
