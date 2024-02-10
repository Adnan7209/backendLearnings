const express = require("express");
// const users = require("./MOCK_DATA.json");

const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 8000;

//connecton
connectMongoDb("mongodb://127.0.0.1:27017/backendLearnings")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error ", err));

//middleware - plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
