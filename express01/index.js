const express = require('express');
const PORT = process.env.PORT || 3500;
const app = express();

app.get('/',(req,res)=> {
    res.send("hello from home page");
})
app.get('/about',(req,res)=> {
    res.send("hello from about page");
})

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));