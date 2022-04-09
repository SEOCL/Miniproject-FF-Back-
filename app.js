const express = require("express");
const connect = require("./schemas");
// const Post = require("./schemas/post");
const cors = require("cors");
const app = express();
const port = 3000;

connect();

// const exampleRouter = require("./routes/examples");

const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleware);

// app.use("/api", );

app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
