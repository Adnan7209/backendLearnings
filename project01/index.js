const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = process.env.PORT || 8000;

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
  return res.json(users);
  ``;
});
app.post("/api/users", (req, res) => {
  //todo create new user
  res.json({ status: "pending" });
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

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user) return res.json(user);
    else return res.send("No data found");
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
