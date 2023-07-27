// 필요한 모듈 로드
const express = require('express');
const oracledb = require('oracledb');

// Express 앱 생성
const app = express();

// Oracle 데이터베이스 연결 설정
const dbConfig = {
  user: 'cgi_5_230721_2',
  password: 'smhrd2',
  connectString: 'project-db-cgi.smhrd.com:1524/xe'
};

// 회원가입 정보를 저장하는 데이터베이스 테이블 (예제에서는 'members' 테이블로 가정)
const MEMBER_TABLE = 'members';

// 회원가입 API 엔드포인트
app.post('/signup', async (req, res) => {
  try {
    // 회원가입 폼에서 받은 정보
    const { name, email, password } = req.body;

    // 데이터베이스 연결
    const connection = await oracledb.getConnection(dbConfig);

    // 회원 정보를 데이터베이스에 삽입
    const insertQuery = `INSERT INTO ${MEMBER} (name, email, password) VALUES (:name, :email, :password)`;
    const bindParams = { name, email, password };
    await connection.execute(insertQuery, bindParams);

    // 연결 해제
    await connection.close();

    // 회원가입 성공 응답
    res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (error) {
    // 오류 처리
    console.error('회원가입 오류:', error);
    res.status(500).json({ message: '서버 오류로 회원가입에 실패했습니다.' });
  }
});

// 로그인 API 엔드포인트
app.post('/login', async (req, res) => {
  try {
    // 로그인 폼에서 받은 정보
    const { email, password } = req.body;

    // 데이터베이스 연결
    const connection = await oracledb.getConnection(dbConfig);

    // 입력된 이메일과 일치하는 회원 정보를 데이터베이스에서 조회
    const selectQuery = `SELECT * FROM ${MEMBER} WHERE email = :email`;
    const result = await connection.execute(selectQuery, [email]);

    // 조회된 결과가 없으면 로그인 실패 처리
    if (result.rows.length === 0) {
      res.status(401).json({ message: '로그인 실패 - 이메일이나 비밀번호가 일치하지 않습니다.' });
      return;
    }

    // 데이터베이스에서 조회된 회원의 비밀번호와 입력된 비밀번호를 비교
    const dbPassword = result.rows[0].password;
    if (dbPassword === password) {
      // 로그인 성공 응답
      res.status(200).json({ message: '로그인에 성공했습니다.' });
    } else {
      // 비밀번호가 일치하지 않으면 로그인 실패 처리
      res.status(401).json({ message: '로그인 실패 - 이메일이나 비밀번호가 일치하지 않습니다.' });
    }

    // 연결 해제
    await connection.close();
  } catch (error) {
    // 오류 처리
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '서버 오류로 로그인에 실패했습니다.' });
  }
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
