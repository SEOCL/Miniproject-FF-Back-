const express = require("express");
const connect = require("./schemas/index");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const port = 3000;

connect();

// 라우터 불러오기
const articleRouter = require("./routers/articles");
const mainPageRouter = require("./routers/mainPages");
const myPageRouter = require("./routers/myPages");
const userRouter = require("./routers/users");

// 접속 로그 남기기
const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};

// 각종 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(requestMiddleware);

// 라우터 연결
app.use("/api", [articleRouter, mainPageRouter, myPageRouter]);
app.use("/user", [userRouter]);

// 서버 열기
app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
