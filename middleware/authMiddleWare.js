const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const fs = require("fs");
const myKey = fs.readFileSync(__dirname + "/key.txt").toString();

module.exports = (req, res, next) => {
  const { logInToken } = req.body;

  try {
    const token = jwt.verify(logInToken, myKey);
    const userId = token.userId;

    User.findOne({ userId })
      .exec()
      .then((user) => {
        res.locals.user = user;
        res.locals.token = logInToken;
        next();
      });
  } catch (error) {
    console.log("여기서 에러난거같음");
    res.status(401).json({ result: "토큰이 유효하지 않습니다." });
    return;
  }
};
