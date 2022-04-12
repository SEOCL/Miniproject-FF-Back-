const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const myKey = fs.readFileSync(__dirname + "/../middleware/key.txt").toString();
const initProfile = fs.readFileSync(__dirname + "/initProfile.txt").toString();

router.get("/user", async (req, res) => {
  res.send("Hello, user");
});

//유저가 로그인 요청 시 사용하는 API입니다.
//썬더 클론 - 더미 데이터로 테스트 완료.
router.post("/logIn", async (req, res) => {
  const { userId, userPw } = req.body;
  const user = await User.findOne({ userId, userPw });

  if (!user) {
    res.status(400).send({
      errorMessage: "아이디 또는 패스워드를 확인해주세요",
    });
    return;
  }

  const payload = { userId };
  const secret = myKey;
  const options = {
    issuer: "백엔드 개발자", // 발행자
    expiresIn: "10d", // 날짜: $$d, 시간: $$h, 분: $$m, 그냥 숫자만 넣으면 ms단위
  };
  const token = jwt.sign(payload, secret, options);
  res.json({ result: true, logInToken: token });
  //토큰 발급.
});

//유저가 회원가입 요청시 사용하는 API입니다.
//썬더 클론 - 더미 데이터로 테스트 완료.
router.post("/signUp", async (req, res) => {
  let { userId, userPw, userName } = req.body;

  const userProfile = initProfile;
  const existUsers = await User.findOne({ userId });

  // 유저가 회원가입 할 시, 유저의 초기 프로필 사진 지정 ->  위의 initProfile 에서
  // url 링크를 가져온다 -> 유저의 초기 프로필 사진이 고정된다.

  if (existUsers) {
    console.log("중복 아이디 찾기에서 에러 발생");
    res.status(400).send({
      result: "중복된 아이디가 존재합니다.",
    });
    return;
  }

  //회원 가입 성공 시의 메시지 호출.
  await User.create({ userId, userPw, userName, userProfile });
  console.log(`${userId} 님이 가입하셨습니다.`);

  res.status(200).send({ result: true });
});

module.exports = router;
