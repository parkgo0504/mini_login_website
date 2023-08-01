
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

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 회원가입 폼 데이터 처리
app.post('/signup', (req, res) => {
  const { name, email, password, 'confirm-password': confirmPassword } = req.body;

  // 비밀번호 확인
  if (password !== confirmPassword) {
    return res.status(400).send('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
  }

  // 회원 정보 데이터베이스에 삽입
  const query = 'INSERT INTO member (Name, Email, PW) VALUES (?, ?, ?)';
  connection.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('회원 정보 저장 실패:', err.message);
      return res.status(500).send('회원 정보 저장에 실패하였습니다.');
    }
    console.log('회원 정보 저장 성공!');
    res.status(200).send('회원 가입이 완료되었습니다.');
  });
});

app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'Join.html')))


app.get('/', (req,res) => { 

  const query = 'INSERT INTO member (Name, Email, PW) VALUES (?, ?, ?)';
  connection.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('회원 정보 저장 실패:', err.message);
      return res.status(500).send('회원 정보 저장에 실패하였습니다.');
    }
    console.log('회원 정보 저장 성공!');
    res.status(200).send('회원 가입이 완료되었습니다.');
  });

});

app.get('/', (req, res) => {
  res.send('서버 웹사이트가 정상적으로 작동 중입니다.');
});


// 간단한 쿼리 실행 예제
connection.query('SELECT 1 + 1 AS result', (err, results) => {
  if (err) {
    console.error('쿼리 실행 실패:', err.message);
    return;
  }
  console.log('쿼리 결과:', results[0].result); // 결과: 2
});

// 테이블 내용 조회 쿼리
const query = 'SELECT * FROM member;';
connection.query(query, (err, results) => {
  if (err) {
    console.error('쿼리 실행 실패:', err.message);
    return;
  }
  console.log('회원 테이블 내용:');
  console.log(results);
});



app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 작동 중입니다.`);
});

// 연결 종료
connection.end((err) => {
  if (err) {
    console.error('MySQL 연결 종료 실패:', err.message);
    return;
  }
  console.log('MySQL 연결 종료!');
});
