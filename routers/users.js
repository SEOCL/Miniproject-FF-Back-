const express = require('express');
const router = express.Router();
const {User} = require('../schemas/user');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const myKey = fs.readFileSync(__dirname + '../middleware/key.txt').toString();
const initProfile = fs.readFileSync(__dirname + './routers/initProfile.txt').toString();
const { auth } = require('./middleware/authMiddleWare');

router.get('/user', async (req, res) => {
    res.send("Hello, user")
});


//유저가 로그인 요청 시 사용하는 API입니다.
router.post('/user/logIn', async (req, res) => {
    
    const {userId, userPw} = req.body;
    const user = await User.findOne({userId, userPw})
        
    if (!user) {
        res.status(400).send({
            errorMessage: "아이디 또는 패스워드를 확인해주세요"
        });
        return;
    }

    const payload = { userId };
    const secret = myKey;
    const options = {
    issuer: '백엔드 개발자', // 발행자
    expiresIn: '10d', // 날짜: $$d, 시간: $$h, 분: $$m, 그냥 숫자만 넣으면 ms단위
    };
    const token = jwt.sign(payload, secret, options);
    res.json({ result: true, logInToken: token})
    //토큰 발급.

    } 
);

//로그아웃 api
// user_id를 찾아서(auth를 통해 user의 정보에 들어있는 것) db에있는 토큰값을 비워준다.
// 미들웨어 필요함.
// 쿠키는 프론트에서 만들어준다. 
router.get("/api/logout", auth, (req, res) => {
    try {
        res.clearCookie('쿠키 이름')    
    }
    //***리액트에서 보내주는 이름으로 수정해야 함

    catch (error) {
    
         res.status(400).json({ result: false })
    }
    
});


//유저가 회원가입 요청시 사용하는 API입니다.
router.post('/user/signUp', async (req, res) => {
    
        //ID의 시작과 끝이 a-zA-Z0-9글자로 3 ~ 10 단어로 구성되어야 한다.
        //Pw의 시작과 끝이 a-zA-Z0-9글자로 4 ~ 30 단어로 구성되어야 한다.
        const re_userId = /^[a-zA-Z0-9]{3,10}$/;
        const re_userPw = /^[a-zA-Z0-9]{4,30}$/;
        const existusers = await User.findOne({userId})

        let {userId, userPw, userName, userProfile} = req.body;
        
        if (userProfile === null || userProfile === undefined) {
            userProfile = initProfile
        }
        // 유저가 회원가입 할 시, 유저의 초기 프로필 사진 지정 ->  위의 initProfile 에서
        // url 링크를 가져온다 -> 유저의 초기 프로필 사진이 고정된다.

        if (existusers) {
            console.log("중복 아이디 찾기에서 에러 발생") 
            res.status(400).send({
                errorMessage: "중복된 아이디입니다."
            });
            return;
            
        } else if (userId.search(re_userId) == -1) {
            console.log("아이디 형식 찾기에서 에러 발생")
            res.status(400).send({
                errorMessage: "아이디의 형식이 올바르지 않습니다."
            });
            return;

        } else if (userPw.search(re_userPw) == -1) {
            console.log("패스워드 형식 찾기에서 에러 발생")
            res.status(400).send({
                errorMessage: "패스워드 형식이 올바르지 않습니다."
            });
            return;
        }
        else if (userPw.search(userId) != -1) {
            console.log("패스워드에 아이디 포함에서 에러 발생")
            res.status(400).send({
                errorMessage: "패스워드에 아이디가 포함되어 있습니다."
            });
            return;
        }

        //회원 가입 성공 시의 메시지 호출.
        await User.create({userId, userPw, userName, userProfile});
        console.log(`${userName} 님이 가입하셨습니다.`);

        res.status(200).send({result: true});
    } 
);
//회원가입 시, 유저의 초기 프로필 사진을 고정 url로 주기-> DB에 저장시키기.


//유저가 회원가입 요청시 ID중복여부를 확인하는 API입니다.


module.exports = router;