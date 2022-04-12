// const timeCal = require('../function/TimeForToday') // 리액트에서 써야하려나?? ~~ 시간전 표기하는 함수
const express = require("express");
const router = express.Router();
const Article = require("../schemas/article");
const authMiddleware = require("../middleware/authMiddleWare");

// 게시글 등록
// 토큰 테스트 미완료
router.post("/articlePost", authMiddleware, async (req, res) => {
  try {
    // 글내용, 이미지URL, 카테고리
    const { articleDesc, articleThumb, articleKind } = req.body;
    const { user } = res.locals.user;
    const userId = user.userId;

    // articleNum이 제일 큰 document 가져오기
    const maxNumber = await Article.findOne().sort("-articleNum");
    let articleNum = 1;
    if (maxNumber) {
      articleNum = maxNumber.articleNum + 1;
    }

    const articleDate = new Date(); // 현재시간 (근데 한국 기준 아닌거 같음)
    const articleLikeNum = 0; // 좋아요 초기 값
    const articleCommentNum = 0; // 댓글 초기 값

    await Article.create({
      articleDesc,
      articleThumb,
      articleKind,
      articleNum,
      articleDate,
      articleLikeNum,
      articleCommentNum,
      userId,
    });

    res.status(200).json({ result: true });
  } catch (error) {
    console.log("articles.js -> 게시글 등록에서 에러남");
    res.status(400).json({ result: false });
  }
});

// 게시글 업데이트 - 원본데이터 내려주기
// 토큰 테스트 미완료
router.get("/articleUpdateRaw", authMiddleware, async (req, res) => {
  try {
    // 게시글 고유번호
    const { articleNum } = req.query;
    articles = await Article.find({ articleNum: Number(articleNum) }); // 게시글의 수정내용이 없어용 [작성중임]
    res.status(200).send(articles);
  } catch (error) {
    console.log(
      "articles.js -> 게시글 업데이트 - 원본데이터 내려주기에서 에러남"
    );
    res.status(400).json({ result: false });
  }
});

// 게시글 업데이트
// 토큰 테스트 미완료
router.put("/articleUpdate", authMiddleware, async (req, res) => {
  try {
    // 게시글 수정내용, 게시글 고유번호, 게시글 이미지URL, 게시글 카테고리
    const { articleDesc, articleNum, articleThumb, articleKind } = req.body;
    const articleDate = new Date();
    await Article.updateOne(
      { articleNum },
      { $set: { articleDesc, articleThumb, articleKind, articleDate } }
    );
    res.status(200).json({ result: true });
  } catch (error) {
    console.log("articles.js -> 게시글 업데이트에서 에러남");
    res.status(400).json({ result: false });
  }
});

// 게시글 삭제
// 토큰 테스트 미완료
router.delete("/articleDelete", authMiddleware, async (req, res) => {
  try {
    // 게시글 고유번호
    const { articleNum } = req.body;
    await Article.deleteOne({ articleNum });
    res.status(200).json({ result: true });
  } catch (error) {
    console.log("articles.js -> 게시글 삭제에서 에러남");
    res.status(400).json({ result: false });
  }
});

module.exports = router;
