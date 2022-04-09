// 내가 맡은 부분
// const timeCal = require('../function/TimeForToday') // 리액트에서 써야하려나?? ~~ 시간전 표기하는 함수
const express = require('express');
const router = express.Router();
const Article = require('../schemas/article')

// 게시글 등록 
// 더미 데이터 테스트 완료 ##
// 토큰 테스트 미완료
// 인증미들웨어 추가예정
router.post('/articlePost', async (req, res) => {
    try {
        // 글내용, 이미지URL, 카테고리
        const { articleDesc, articleThumb, articleKind } = req.body
        const userId = "토큰에서 뽑아야함"

        // articleNum이 제일 큰 document 가져오기
        const maxNumber = await Article.findOne().sort("-articleNum")
        let articleNum = 1;
        if (maxNumber) {
            articleNum = maxNumber.articleNum + 1
        }

        // const nowTime = new Date()
        // console.log(timeCal.TimeForToday(nowTime)); //방금전, ~분 전, ~시간 전 ...

        const articleDate = new Date() // 현재시간 (근데 한국 기준 아닌거 같음)
        const articleLikeNum = 0 // 좋아요 초기 값
        const articleCommentNum = 0 // 댓글 초기 값

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
// 더미 데이터 테스트 완료 ##
// 토큰 테스트 미완료
// 인증미들웨어 추가예정
router.get('/articleUpdateRaw', async (req, res) => {
    try {
        // 게시글 고유번호
        const { articleNum } = req.query
        articles = await Article.find({ articleNum : Number(articleNum) }) // 게시글의 수정내용이 없어용 [작성중임]
        res.status(200).send(articles)
    }
    catch (error) {
        console.log("articles.js -> 게시글 업데이트 - 원본데이터 내려주기에서 에러남");
        res.status(401).json({ result : false })
    }    
});

// 게시글 업데이트
// 더미 데이터 테스트 완료 ##
// 토큰 테스트 미완료
// 인증미들웨어 추가예정
router.put('/articleUpdate', async (req, res) => {
    try {
        // 게시글 수정내용, 게시글 고유번호, 게시글 이미지URL, 게시글 카테고리
        const { articleDesc, articleNum, articleThumb, articleKind } = req.body
        const articleDate = new Date()
        await Article.updateOne({ articleNum }, { $set: { articleDesc, articleThumb, articleKind, articleDate } }) 
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
        await Article.deleteOne({ articleNum }) 
        res.status(200).json({ result : true })
    }
    catch (error) {
        console.log("articles.js -> 게시글 삭제에서 에러남");
        console.log(error);
        res.status(401).json({ result : false })
    }    
});

module.exports = router;