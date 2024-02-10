const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

/* router.get("/", async (req, res) => {
const allDbUsers = await userModel.find({});
const html = `
    <ul>
        ${allDbUsers
            .map((user) => `<li>${user.firstName} -${user.email}</li>`)
            .join("")}
    </ul>
    `;
res.send(html);
}); */

//Routes
/* router.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
}); */
/* router.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user) return res.json(user);
    else return res.send("No data found");
  });
  router.patch("/api/users:id", (req, res) => {
    //todo edit user
    res.json({ status: "pending" });
  });
  router.delete("/api/users:id", (req, res) => {
    //todo delete user
    res.json({ status: "pending" });
  }); */

module.exports = router;
