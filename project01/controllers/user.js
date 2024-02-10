const userModel = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await userModel.find({});
  return res.json(allDbUsers);

  /* console.log(req.headers);
    //   always add X prefix to custom headers
      res.setHeader("X-myName","Adnan"); */
};

const handleGetUserById = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) return res.status(404).json("No data found");
  return res.json(user);

  /* const id = Number(req.params.id);
      const user = users.find((user) => user.id === id); */
};

const handleUpdateUserById = async (req,res) => {
    await userModel.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    res.json({ status: "changed succesfully" });
}

const handleDeleteUserById = async (req,res) => {
    await userModel.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
}

const handleCreateNewUser = async (req,res) => {
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    )
      return res.status(402).json("All fields are required");

    const result = await userModel.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
    });

    console.log("result", result);
    return res.status(201).json({ msg: "success",id:result._id });
  
    // console.log("body", body);
    // users.push({ ...body, id: users.length + 1 });
  
    
  
    /* fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.status(202).json({status:"success",id:users.length})
      }) */
    //   res.json({ status: "pending" });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser

};
