const express = require("express");
const Article = require("../schemas/article");
const Comment = require("../schemas/comment");
const Like = require("../schemas/like");
const jwt = require("jsonwebtoken");
const router = express.Router();

// 메인페이지 데이터
router.get("/main", async (req, res) => {
  try {
    const article = await Article.find({});

    res.json({ article });
  } catch (error) {
    res.status(404).json({ result: false });
  }
});

// 모달창 해당 게시글 데이터
router.get("/modal", async (req, res) => {
  try {
    const { articleNum } = req.query;

    const comment = await Comment.find({ articleNum });
    const like = await Like.find({ articleNum });

    let likeCheck = false;

    if (like) {
      likeCheck = true;
    }

    res.json({ comment, like: likeCheck });
  } catch (error) {
    res.status(404).json({ result: false });
  }
});

// 검색 기능
router.get("/search", async (req, res) => {
  try {
    const { articleKind, articleDesc } = req.query;

    console.log(articleKind, articleDesc);

    const article = await Article.find({
      articleKind: articleKind,
      articleDesc: { $regex: articleDesc },
    });

    res.json({ article });
  } catch (error) {
    res.status(404).json({ result: false });
  }
});

// 좋아요 추가 삭제 기능
router.post("/like", async (req, res) => {
  try {
    const { articleNum, like, logInToken } = req.body;

    const decoded = jwt.verify(logInToken, "key");

    if (like) {
      await Article.update({ articleNum }, { $inc: { articleLikeNum: -1 } });
      await Like.deleteOne({ articleNum, userId: decoded.userId });
    } else {
      await Article.update({ articleNum }, { $inc: { articleLikeNum: 1 } });
      await Like.create({ articleNum, userId: decoded.userId });
    }

    res.json({ result: true });
  } catch (error) {
    res.status(400).json({ result: false });
  }
});

// 댓글 작성
router.post("/commentPost", async (req, res) => {
  try {
    const { articleNum, contents, logInToken } = req.body;

    const decoded = jwt.verify(logInToken, "key");
    const maxCommentNumber = await Comment.findOne().sort("-commentNum");

    let commentNum = 1;
    if (maxCommentNumber) {
      commentNum = maxCommentNumber.commentNum + 1;
    }

    const commentDate = new Date();

    await Comment.create({
      articleNum,
      commentNum,
      userId: decoded.userId,
      userProfile: decoded.userProfile,
      userName: decoded.userName,
      contents,
      commentDate,
    });

    await Article.update({ articleNum }, { $inc: { articleCommentNum: 1 } });

    res.json({ result: true });
  } catch (error) {
    res.status(400).json({ result: false });
  }
});

// 댓글 삭제
router.delete("/commentDelete", async (req, res) => {
  try {
    const { commentNum } = req.body;

    const commentArticleNum = await Comment.findOne({ commentNum });

    await Comment.deleteOne({ commentNum });
    await Article.update(
      { articleNum: commentArticleNum.articleNum },
      { $inc: { articleCommentNum: -1 } }
    );

    res.json({ result: true });
  } catch (error) {
    res.status(400).json({ result: false });
  }
});

module.exports = router;
