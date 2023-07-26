// server.js

// oracledb 모듈 불러오기
const oracledb = require('oracledb');

// Oracle 데이터베이스 연결 정보 설정
const dbConfig = {
  user: 'cgi_5_230721_2',
  password: 'smhrd2',
  connectString: 'project-db-cgi.smhrd.com:1524/xe' // host:port/SID 형식으로 입력
};

// 데이터베이스 연결 함수
async function connectToDB() {
  try {
    // 데이터베이스에 연결
    await oracledb.createPool(dbConfig);

    console.log('Oracle 데이터베이스에 연결되었습니다.');

    // 여기에 원하는 쿼리를 실행하는 로직을 추가할 수 있습니다.
    // 예를 들어, SELECT 쿼리를 실행해보겠습니다.
    const result = await oracledb.getConnection().execute('SELECT * FROM your_table');
    console.log('쿼리 결과:', result.rows);

  } catch (error) {
    console.error('Oracle 데이터베이스 연결 오류:', error);
  } finally {
    // 데이터베이스 연결 종료
    await oracledb.getPool().close();
    console.log('Oracle 데이터베이스 연결이 닫혔습니다.');
  }
}

// 서버 실행
connectToDB();
