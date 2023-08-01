const express = require('express');
const mysql = require('mysql2');

const app = express();

// MySQL2 연결 설정
const connection = mysql.createConnection({
    host: 'localhost', // MySQL 서버 주소
    user: 'root', // MySQL 사용자 이름
    password: '12345', // MySQL 비밀번호
    database: 'my_mini', // 사용할 데이터베이스 이름
  });

// MySQL2 연결 확인
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
  } else {
    console.log('MySQL에 성공적으로 연결되었습니다.');
  }
});
const bodyParser = require('body-parser');

// JSON 형식의 요청 본문 파싱
app.use(bodyParser.json());

// URL-encoded 형식의 요청 본문 파싱
app.use(bodyParser.urlencoded({ extended: true }));
// 루트 경로로 접속했을 때
app.get('/', (req, res) => {
    res.send('서버 웹사이트가 정상적으로 작동 중입니다.');
  });
  
  // 예시: 사용자 정보를 조회하는 API 엔드포인트
  app.get('/users', (req, res) => {
    // MySQL2를 사용하여 데이터베이스에서 사용자 정보를 조회하는 쿼리 실행
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('사용자 정보 조회 오류:', err);
        res.status(500).send('사용자 정보 조회 오류 발생');
      } else {
        res.json(results);
      }
    });
  });
  const port = 3000;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 작동 중입니다.`);
});
