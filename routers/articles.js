// 내가 맡은 부분
const express = require('express');
const router = express.Router();
const Article = require('../schemas/article')

// 게시글 등록
router.post('/articlePost', async (req, res) => {
    try {
        // 글내용, 이미지URL, 카테고리
        const { articleDesc, articleThumb, articleKind } = req.body
        
        const articleNum = 1 // 동선님한테 이거 최대값으로 가져오는거 >> 마지막 게시물을 삭제하면 문제 있는거 아닌가??
        const articleDate = new Date()
        const articleLikeNum = 0
        const articleCommentNum = "0"
        
        const userId = "테스트 유저 아이디 - TS"
        await Article.create(
            { 
            articleDesc, 
            articleThumb, 
            articleKind, 
            articleNum, 
            articleDate, 
            articleLikeNum, 
            articleCommentNum,
            userId
            }
        )
        res.status(200).json({ result : true })
    }
    catch (error) {
        console.log("articles.js -> 게시글 등록에서 에러남");
        console.log(error)
        res.status(401).json({ result : false })
    }
  });

// 게시글 업데이트 - 원본데이터 내려주기
router.get('/articleUpdateRaw', async (req, res) => {
    try {
        // 게시글 고유번호
        const { articleNum } = req.query
        articles = await Article.find({ articleNum }) // 게시글의 수정내용이 없어용 [작성중임]
        res.status(200).send(articles)
    }
    catch (error) {
        console.log("articles.js -> 게시글 업데이트 - 원본데이터 내려주기에서 에러남");
        res.status(401).json({ result : false })
    }    
});

// 게시글 업데이트
router.put('/articleUpdate', async (req, res) => {
    try {
        // 게시글 수정내용, 게시글 고유번호, 게시글 이미지URL, 게시글 카테고리
        const { articleDesc, articleNum, articleThumb, articleKind } = req.body
        await Article.updateOne({ articleNum }, { $set: { articleDesc, articleThumb, articleKind } }) 
        res.status(200).json({ result : true })
    }
    catch (error) {
        console.log("articles.js -> 게시글 업데이트에서 에러남");
        res.status(401).json({ result : false })
    }    
});

// 게시글 삭제
router.delete('/articleDelete', async (req, res) => {
    try {
        // 게시글 고유번호
        const { articleNum } = req.body
        await article.deleteOne({ articleNum }) 
        res.status(200).json({ result : true })
    }
    catch (error) {
        console.log("articles.js -> 게시글 삭제에서 에러남");
        res.status(401).json({ result : false })
    }    
});

module.exports = router;