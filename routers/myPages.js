const express = require("express");
const router = express.Router();
const Article = require("../schemas/article");
const User = require("../schemas/user");
const Like = require("../schemas/like");
const authMiddleware = require("../middleware/authMiddleWare");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

// 마이페이지 비밀번호 체크
// 더미 데이터 테스트 완료 ##
router.post("/pwCheck", authMiddleware, async (req, res) => {
  // 글내용, 이미지URL, 카테고리
  const { userPw } = req.body;
  const { user } = res.locals; // user DB 담겨있음

  if (user.userPw === userPw) {
    res.status(200).json({ result: true });
    return;
  } else {
    console.log("myPages.js -> 비밀번호 체크에서 에러남");

    res.status(400).json({ result: false });
    return;
  }
});

// 내가 작성한 게시글 조회
// 더미 데이터 테스트 완료 ##
router.get("/article", authMiddleware, async (req, res) => {
  try {
    const { user } = res.locals;
    const { userId } = user;
    const articles = await Article.find({ userId }).sort({ articleDate: -1 });

    res.status(200).json({ articles });
  } catch (error) {
    console.log(error);
    console.log("myPages.js -> 내가 작성한 게시글 조회에서 에러남");

    res.status(400).json({ result: false });
  }
});

// 내가 좋아요 누른 게시글 조회
// 더미 데이터 테스트 완료 ##
router.get("/articleLike", authMiddleware, async (req, res) => {
  try {
    // 글내용, 이미지URL, 카테고리
    const { user } = res.locals;
    const { userId } = user;

    // 좋아요 누른 article 명단
    // articleLikes = [{ userId, articleNum }, { userId, articleNum }]
    const articleLikes = await Like.find({ userId });

    const articles = [];
    for (let articleLike of articleLikes) {
      const articleOne = await Article.findOne({
        articleNum: articleLike.articleNum,
      });
      articles.push(articleOne);
    }
    // articles = articles.sort({ articleDate: -1 });

    console.log("여기를 봐봡요~~~~~", articles);
    articles.sort(function (a, b) {
      return new Date(b.articleDate) - new Date(a.articleDate);
    });

    res.status(200).json({ articles });
  } catch (error) {
    console.log(error);
    console.log("myPages.js -> 내가 좋아요 누른 게시글 조회에서 에러남");

    res.status(400).json({ result: false });
  }
});

// 프로필 이미지, 유저닉네임 업데이트(내 정보 수정)
// 더미 데이터 테스트 완료 ##
router.put(
  "/myInfoUpdate",
  multipartMiddleware,
  authMiddleware,
  async (req, res) => {
    try {
      // 유저닉네임, 유저Id
      const { userName } = req.body; // 유저닉네임
      const { user } = res.locals;
      const { userId } = user; // 유저Id

      // 프로필 이미지 파일경로
      let { path } = req.files.userProfile;
      path = path.replace("uploads", "");

      await User.updateOne(
        { userId },
        { $set: { userProfile: path, userName } }
      );
      res.status(200).json({ result: true });
    } catch (error) {
      console.log(error);
      console.log("myPages.js -> 내 정보 수정에서 에러남");

      res.status(400).json({ result: false });
    }
  }
);

module.exports = router;
