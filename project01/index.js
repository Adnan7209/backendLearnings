const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const { log } = require("console");

const app = express();
const PORT = process.env.PORT || 8000;

//middleware - plugin
app.use(express.urlencoded({extended:false}));

//Routes
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
    console.log(req.headers);
    //always add X prefix to custom headers
    res.setHeader("X-myName","Adnan")
  return res.json(users);
});
app.post("/api/users", (req, res) => {
  //todo create new user
  const body = req.body;
  if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title)
  return res.status(402).json("All fields are required");

  console.log("body",body);
  users.push({...body,id:users.length+1});
  fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    return res.status(202).json({status:"success",id:users.length})
  })
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
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) 
    return res.status(404).json("No data found");
    return res.json(user);
    
  })
  .patch((req, res) => {
    //todo create new user
    res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //todo delete user
    res.json({ status: "pending" });
  });

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
