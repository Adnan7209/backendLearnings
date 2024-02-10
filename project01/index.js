const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const { log } = require("console");
const mongoose = require('mongoose');
const { stringify } = require("querystring");

const app = express();
const PORT = process.env.PORT || 8000;

//connecton
mongoose.connect('mongodb://127.0.0.1:27017/backendLearnings')
.then(()=>console.log("mongodb connected"))
.catch((err)=> console.log("mongo error ",err))


const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required : true,
  },
  lastName:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  jobTitle:{
    type:String,
  },
  gender:{
    type:String,
    required:true,
    enum:['male','female']
  },

},{timestamps:true})

const userModel = mongoose.model('user',userSchema); 


//middleware - plugin
app.use(express.urlencoded({extended:false}));

//Routes
/* app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
}); */
app.get("/users", async (req, res) => {
  const allDbUsers = await userModel.find({});
  const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} -${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users",async (req, res) => {
  const allDbUsers = await userModel.find({});
    console.log(req.headers);
    //always add X prefix to custom headers
    res.setHeader("X-myName","Adnan")
  return res.json(allDbUsers);
});
app.post("/api/users", async (req, res) => {
  //todo create new user
  const body = req.body;
  if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title)
  return res.status(402).json("All fields are required");

  console.log("body",body);
  users.push({...body,id:users.length+1});


  const result = await userModel.create({
    firstName: body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    jobTitle:body.job_title
  });
  console.log("result",result)
  return res.status(201).json({msg:"success"});
  

  
  /* fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    return res.status(202).json({status:"success",id:users.length})
  }) */
//   res.json({ status: "pending" });
});

/* app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) return res.json(user);
  else return res.send("No data found");
});
app.patch("/api/users:id", (req, res) => {
  //todo edit user
  res.json({ status: "pending" });
});
app.delete("/api/users:id", (req, res) => {
  //todo delete user
  res.json({ status: "pending" });
}); */

app.route("/api/users/:id")
  .get(async (req, res) => {
    /* const id = Number(req.params.id);
    const user = users.find((user) => user.id === id); */

    const user = await userModel.findById(req.params.id);

    if (!user) 
    return res.status(404).json("No data found");
    return res.json(user);
    
  })
  .patch(async(req, res) => {
    await userModel.findByIdAndUpdate(req.params.id,{lastName:'changed'});
    res.json({ status: "changed succesfully" });
  })
  .delete(async (req, res) => {
    await userModel.findByIdAndDelete(req.params.id)
    res.json({ status: "success" });
  });

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
