/* 
*최초작성자 :박기원
*최초작성일 :2023.07.27
*최종변경일 :2023.08.30
*목적 : mysql 와 html 연결하여 node.js 이용하여 서버 이용 (로그인 페이지)
*개정이력 : 카카오 간편 로그인 수정중


 */

// const 변수를 선언하는 방법 int,float 이런식으로 단 다른 값을 할당할 수 없음!!
// require 은 모듈을 불러오는 함수
//mysql2는 mysql 데이터베이스와 연결하여 데이터를 읽고 쓸수 있음

const mysql = require('mysql2');

// expresss는 Node.js에서 쓰는 프레임워크 코드를 더 쉽게 작성
// 라우팅 미들웨어 욫텅 응답 객체등을 다루는 기능 제공
// 용청과 응답 사이에서 처리되어야 할 로직 추가
const express = require('express');


const path = require('path')

// body-parser는 Node.js에서 express 애플리케이션 http post 요청(body) 쉽게 추출할 수 있도록 도와주는 미들웨어

const bodyParser = require('body-parser');

//body-parser를 쓸라면 코드
/* const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // JSON 형식의 요청 본문 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식의 요청 본문 파싱
 */

// const Kakao = require('kakao'); // Kakao 라이브러리를 사용하기 위해 필요한 npm 코드
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const app = express();
const port = 3000;

//Body-parser 미들웨어를 Express 애플리케이션에 등록합니다.

// JSON 형식의 요청 본문 파싱
app.use(bodyParser.json());
// URL-encoded 형식의 요청 본문 파싱
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: 'localhost', // MySQL 서버 주소
  user: 'root', // MySQL 사용자 이름
  password: '12345', // MySQL 비밀번호
  database: 'my_mini', // 사용할 데이터베이스 이름
});

// MySQL 데이터베이스 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err.message);
    return;
  }
  console.log('MySQL 연결 성공!');
});

// Passport 설정
passport.use(new KakaoStrategy({
  clientID: '3891aebf985c1c66cadfb5a862182fb2',
  callbackURL: 'http://localhost:3000/auth/kakao/callback', // 로그인 후 리다이렉트할 주소
}, (accessToken, refreshToken, profile, done) => {
  // 여기에서 프로필 데이터를 기반으로 사용자를 생성하거나 업데이트할 수 있습니다.
  // 사용자 객체를 done 함수에 전달하세요.
  return done(null, profile);
}));

// 회원가입 폼 페이지 제공
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'login_copy.html')));

// 회원가입 폼 데이터 처리
app.post('/signup', (req, res) => {
  const {id, password, name, email, 'confirm-password': confirmPassword } = req.body;

  
  // 비밀번호 확인
  if (password !== confirmPassword) {
    return res.status(400).send('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
  }

  // 회원 정보 데이터베이스에 삽입
  const query = 'INSERT INTO member (ID,PW, Name, Email ) VALUES (?, ?, ?,?)';
  connection.query(query, [id,password,name, email ], (err, results) => {
    if (err) {
      console.error('회원 정보 저장 실패:', err.message);
      return res.status(500).send('회원 정보 저장에 실패하였습니다.');
    }
    console.log('회원 정보 저장 성공!');
    res.sendFile(__dirname + '/login_copy.html');
  });
});



app.post('/login', (req, res) => {
  const { id, password } = req.body;

  const query = 'SELECT ID, PW FROM member WHERE ID = ? AND PW = ?';
  connection.query(query, [id, password], (err, results) => {
    

    
    if (err) {
      console.error('Login failed:', err.message);
      return res.status(500).send('Login failed.');
      // 올바르지 않은 경우 오류 메시지 표시
    }

    if (results.length === 0) {
      // If no matching ID and password in the database
      return res.status(401).send('Invalid credentials.');
      
    }

    console.log('Login successful!');
    // 올바른 경우 로그인 성공 페이지로 이동
    res.sendFile(__dirname + '/home.html');
  });
});

app.get('/join_move', (req, res) => {
  // Join.html 파일로 이동
  res.sendFile(path.join(__dirname, 'Join.html'));
});

//파일 이동
app.get('/board_move', (req, res) => {
  // board_copy.html 파일로 이동
  res.sendFile(path.join(__dirname, 'board_main.html'));
});

app.get('/kakaomap_move', (req, res) => {
  // kakaomap.html 파일로 이동
  res.sendFile(path.join(__dirname, 'kakaomap.html'));
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 작동 중입니다.`);
});

// // 연결 종료
// connection.end((err) => {
//   if (err) {
//     console.error('MySQL 연결 종료 실패:', err.message);
//     return;
//   }
//   console.log('MySQL 연결 종료!');
// });
