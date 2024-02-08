// const fs = require("fs");

const path = require('path');

//Read Operation
/* fs.readFile(path.join(__dirname,'files','starter.txt'),'utf-8',(err,data) => {
    if(err) throw err;
    // console.log(data.toString());
    console.log(data);
}) */

// console.log("hello");

//Write operation
/* fs.writeFile(path.join(__dirname,'files','reply.txt'),"This is replied data1",(err) => {
    if(err) throw err;
    // console.log(data.toString());
    console.log("write complete");

    fs.appendFile(path.join(__dirname,'files','reply.txt'),"\nThis is appended data2",(err) => {
        if(err) throw err;
        // console.log(data.toString());
        console.log("append complete");

        fs.rename(path.join(__dirname,'files','reply.txt'),"newReply.txt",(err) => {
            if(err) throw err;
            // console.log(data.toString());
            console.log("Rename complete");
        })
    })
})
 */


/* process.on('uncaughtException',err => {
    console.error(`There was as uncaught error : ${ err}`);
    process.exit(1);
}) */



const fsPromises = require('fs').promises;

const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname,'files','starter.txt'),'utf-8');
        console.log(data);
        
        await fsPromises.unlink(path.join(__dirname,'files','starter.txt'));
        await fsPromises.writeFile(path.join(__dirname,'files','promiseWrite.txt'),data);
        await fsPromises.appendFile(path.join(__dirname,'files','promiseWrite.txt'),"\nNice to meet you");
        await fsPromises.rename(path.join(__dirname,'files','promiseWrite.txt'),path.join(__dirname,'files','renamedPromise.txt'));

        const newData = await fsPromises.readFile(path.join(__dirname,'files','renamedPromise.txt'),'utf-8');
        console.log(newData);
        

    }catch(err){
        console.error(err)
    }
}

fileOps();
