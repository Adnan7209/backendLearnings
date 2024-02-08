const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

//intialize object
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on('log',(msg) => logEvents(msg));

setTimeout(() => {
   myEmitter.emit('log','Log event Emitted'); 
}, 2000);

