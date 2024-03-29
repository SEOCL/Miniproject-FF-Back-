# Miniproject-FF-Back-

# For Fun ? (Miniproject)

## 1. 프로젝트 소개  🕺
> 각자의 취미 결과물을 각 카테고리와 그 카테고리에 맞는 사진과 해당 내용으로 게시하고 공유할 수 있으며, 이에 대한 반응으로 댓글과 좋아요를 표현할 수 있습니다. 

> 사이트 메인 링크: http://chamchipack.shop.s3-website.ap-northeast-2.amazonaws.com/ (!서버는 계속 열려있지 않을 수 있습니다!)   

> 사이트 실행 영상: https://www.youtube.com/watch?v=MN4U-uzG4Ms&feature=youtu.be

![{9F8A327A-A579-44C2-974C-981023B7339F}](https://user-images.githubusercontent.com/101075938/163362023-cbdfc66a-e875-4f02-8147-f831fba69aaf.png)

![{D6348576-53F9-4D63-927F-8F53553B2A5B}](https://user-images.githubusercontent.com/101075938/163362046-05ee9a7f-1024-4edc-be98-c56d48e08b9a.png)

![{E1A0E908-9967-47F9-A27A-8C28FCF40DB5}](https://user-images.githubusercontent.com/101075938/163362084-cbc3b0a0-6aa4-427f-858c-ac3c86ed8ee3.png)

![{3201D459-1513-467B-BED0-7370B67263B4}](https://user-images.githubusercontent.com/101075938/163362106-da57d3f1-ea57-4d00-80d6-1533a14e5524.png)


## 2. 제작 기간 & 팀원 소개 👐
- 기간: 2022년 4월 7일~ 22년 4월 14일 
- 총 6명으로 구성된 팀 프로젝트. (C반 4조)
1. **프론트 3명**
- **조찬익**: 메인페이지의 모달창 관련 게시물 적용, 좋아요 기능 관련 구현, 댓글관련 기능 구현, 코드 피드백
- **공지애**: 검색, 메인페이지 게시물 불러오기, 게시물 수정, 게시물 삭제, 내가 올린 게시물 불러오기,  게시물 컴포넌트, 메인 반응형 적용, 코드 피드백
- **조영민**: 페이지 모달창 관련 게시물 적용, 좋아요 기능 관련 구현, 댓글 관련 기능 구현, 코드 피드백
  
2. **백엔드 3명**(Router 부분으로 파트 배분)
- **이태성**(4조 팀장): 백엔드 틀과 깃 북(API명세서) 수정, 전체적인 팀 진행과 조율, Article API & My Page API, 미들웨어, 오류 수정
- **김동선**: Main Page API & My Page API(이미지 파일 업로드), 미들웨어, 오류 수정, 코드 피드백
- **서현우**: User API, 미들웨어, 코드 피드백

## 3. 사용 기술(개발 툴) 🛠
- **Server**: AWS EC2 (Ubuntu 18.04 LTS)
- **Framework**: React(FE), Node.js + Express(BE) (Javascript)
- **Database**: MongoDB
- **Design Tool**: Figma
- **Tool** : Git Hub, Notion, Git Book

## 4. 핵심 기능 ✨
- **로그인**, **회원가입**
- **메인창**: 검색(일반 검색 + 카테고리 적용 및 검색), 좋아요 누르기, 댓글 저장 및 삭제, 게시글 상세 조회(모달창)
- **게시글**: 게시글 작성, 수정, 삭제
- **마이 페이지**: 비밀번호 체크(토큰 부여 및 로그인 여부 확인) --> 내 게시글과 좋아요 누른 게시글 조회, 프로필 이미지 등록 or 수정, 닉네임 수정
