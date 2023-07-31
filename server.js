const mysql = require('mysql2');

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

// 연결 종료
connection.end((err) => {
  if (err) {
    console.error('MySQL 연결 종료 실패:', err.message);
    return;
  }
  console.log('MySQL 연결 종료!');
});
