const express = require("express");
const Article = require("../schemas/article");
const Comment = require("../schemas/comment");
const Like = require("../schemas/like");
const User = require("../schemas/user");
const authMiddleware = require("../middleware/authMiddleWare");
const router = express.Router();

// 메인페이지 데이터
router.get("/main", async (req, res) => {
  try {
    const articles = await Article.find({});

    const articleUsers = [];
    for (let user of articles) {
      const userInfo = await User.findOne({
        userId: user.userId,
      });
      articleUsers.push(userInfo);
    }

    res.status(200).json({ articles, articleUsers });
  } catch (error) {
    console.log("mainPages.js -> 메인페이지에서 에러남");
    res.status(404).json({ result: false });
  }
});

// 모달창 해당 게시글 데이터
router.get("/modal", async (req, res) => {
  try {
    const { articleNum } = req.query;

    const comments = await Comment.find({ articleNum });
    const like = await Like.find({ articleNum });

    let likeCheck = false;

    if (like) {
      likeCheck = true;
    }

    res.status(200).json({ comments, like: likeCheck });
  } catch (error) {
    console.log("mainPages.js -> 모달창에서 에러남");
    res.status(404).json({ result: false });
  }
});

// 검색 기능
router.get("/search", async (req, res) => {
  try {
    const { articleKind, articleDesc } = req.query;

    console.log(articleKind, articleDesc);

    const articles = await Article.find({
      articleKind: articleKind,
      articleDesc: { $regex: articleDesc },
    });

    res.status(200).json({ articles });
  } catch (error) {
    console.log("mainPages.js -> 검색에서 에러남");
    res.status(404).json({ result: false });
  }
});

// 좋아요 추가 삭제 기능
router.post("/like", authMiddleware, async (req, res) => {
  try {
    const { articleNum, like } = req.body;

    const { user } = res.locals.user;
    const userId = user.userId;

    if (like) {
      await Article.update({ articleNum }, { $inc: { articleLikeNum: -1 } });
      await Like.deleteOne({ articleNum, userId });
    } else {
      await Article.update({ articleNum }, { $inc: { articleLikeNum: 1 } });
      await Like.create({ articleNum, userId });
    }

    res.status(200).json({ result: true });
  } catch (error) {
    console.log("mainPages.js -> 좋아요에서 에러남");
    res.status(400).json({ result: false });
  }
});

// 댓글 작성
router.post("/commentPost", authMiddleware, async (req, res) => {
  try {
    const { articleNum, contents } = req.body;

    const { user } = res.locals.user;
    const userId = user.userId;
    const userProfile = user.userProfile;
    const userName = user.userName;

    const maxCommentNumber = await Comment.findOne().sort("-commentNum");

    let commentNum = 1;
    if (maxCommentNumber) {
      commentNum = maxCommentNumber.commentNum + 1;
    }

    const commentDate = new Date();

    await Comment.create({
      articleNum,
      commentNum,
      userId,
      userProfile,
      userName,
      contents,
      commentDate,
    });

    await Article.update({ articleNum }, { $inc: { articleCommentNum: 1 } });

    res.status(200).json({ result: true });
  } catch (error) {
    console.log("mainPages.js -> 댓글 작성에서 에러남");
    res.status(400).json({ result: false });
  }
});

// 댓글 삭제
router.delete("/commentDelete", authMiddleware, async (req, res) => {
  try {
    const { commentNum } = req.body;

    const commentArticleNum = await Comment.findOne({ commentNum });

    await Comment.deleteOne({ commentNum });
    await Article.update(
      { articleNum: commentArticleNum.articleNum },
      { $inc: { articleCommentNum: -1 } }
    );

    res.status(200).json({ result: true });
  } catch (error) {
    console.log("mainPages.js -> 댓글 삭제에서 에러남");
    res.status(400).json({ result: false });
  }
});

module.exports = router;
