// console.log('testing!');


const {format} = require('date-fns');
const {v4 : uuid} = require('uuid');

/* console.log(format(new Date(),'dd-MMM-yyyy\tHH:mm:ss'));

console.log("hello");

console.log(uuid()); */

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(),'dd-MMM-yyyy\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname,'logs','eventLogs.txt'))){
            await fsPromises.mkdir(path.join(__dirname,'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'logs','eventLogs.txt'),logItem);
        
    } catch (err) {
        console.error(err);
    }
}

module.exports = logEvents;



