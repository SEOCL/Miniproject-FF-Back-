// 내가 맡은 부분

const express = require("express");
const router = express.Router();
const Article = require("../schemas/article");
const User = require("../schemas/user");
const Like = require("../schemas/like");

// 마이페이지 비밀번호 체크
// 더미 데이터 테스트 완료 ##
// 토큰 테스트 미완료
// 인증미들웨어 추가예정
router.post("/pwCheck", async (req, res) => {
  // 글내용, 이미지URL, 카테고리
  const { userPw } = req.body;
  const token = { tokenUserId: "testID" }; // 실제 토큰 값으로 대체해야함
  const userId = token.tokenUserId;

  userInfo = await User.findOne({ userId });
  if (userInfo.userPw === userPw) {
    res.status(200).json({ result: true });
    return;
  } else {
    console.log("myPages.js -> 비밀번호 체크에서 에러남");
    res.status(401).json({ result: false });
    return;
  }
});

// 내가 작성한 게시글 조회
// 더미 데이터 테스트 완료 ##
// 토큰 테스트 미완료
// 인증미들웨어 추가예정
router.get("/article", async (req, res) => {
  try {
    // 글내용, 이미지URL, 카테고리
    const { userId } = req.query;
    const article = await Article.find({ userId });

    res.status(200).json(article);
  } catch (error) {
    console.log("myPages.js -> 내가 작성한 게시글 조회에서 에러남");
    res.status(401).json({ result: false });
  }
});

// 내가 좋아요 누른 게시글 조회
// 더미 데이터 테스트 완료 ##
// 토큰 테스트 미완료
// 인증미들웨어 추가예정
router.get("/articleLike", async (req, res) => {
  try {
    // 글내용, 이미지URL, 카테고리
    const { userId } = req.query;
    const articles = await Like.find({ userId });

    res.status(200).json(articles);
  } catch (error) {
    console.log("myPages.js -> 내가 작성한 게시글 조회에서 에러남");
    res.status(401).json({ result: false });
  }
});

// 프로필 이미지 등록
// 더미 데이터 테스트 완료 ##
// 토큰 테스트 미완료
// 인증미들웨어 추가예정
router.post("/profilePost", async (req, res) => {
  try {
    // 프로필 이미지 URL, 유저id
    const { userProfile, userId } = req.body;
    await User.updateOne({ userId }, { $set: { userProfile } }); // 프로필 기본이미지를 설정하고 등록하면 업데이트 하는식으로 구현
    res.status(200).json({ result: true });
  } catch (error) {
    console.log("myPages.js -> 프로필 이미지 등록에서 에러남");
    res.status(401).json({ result: false });
  }
});

// 프로필 이미지 업데이트
// 더미 데이터 테스트 완료 ##
// 토큰 테스트 미완료
// 인증미들웨어 추가예정
router.post("/profileUpdate", async (req, res) => {
  try {
    // 프로필 이미지 URL, 유저id
    const { userProfile, userId } = req.body;
    await User.updateOne({ userId }, { $set: { userProfile } });
    res.status(200).json({ result: true });
  } catch (error) {
    console.log("myPages.js -> 프로필 이미지 업데이트에서 에러남");
    res.status(401).json({ result: false });
  }
});

// 유저 닉네임 업데이트
// 더미 데이터 테스트 완료 ##
// 토큰 테스트 미완료
// 인증미들웨어 추가예정
router.post("/nameUpdate", async (req, res) => {
  try {
    // 유저 닉네임, 유저id
    const { userName, userId } = req.body;
    await User.updateOne({ userId }, { $set: { userName } });
    res.status(200).json({ result: true });
  } catch (error) {
    console.log("myPages.js -> 유저 닉네임 업데이트에서 에러남");
    res.status(401).json({ result: false });
  }
});

module.exports = router;
