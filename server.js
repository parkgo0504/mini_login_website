const oracledb = require('oracledb');

// 연결 정보
const username = 'cgi_5_230721_2';
const password = 'smhrd2';
const hostname = 'project-db-cgi.smhrd.com';
const port = 1524;
const serviceName = 'xe';

// 연결 설정
const connectionConfig = {
  user: username,
  password: password,
  connectString: `${hostname}:${port}/${serviceName}`
};

// 데이터베이스 연결
oracledb.getConnection(connectionConfig, (err, connection) => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err);
    return;
  }

  // 연결 성공 시
  console.log('데이터베이스에 연결되었습니다.');

  // 이후 작업을 진행하거나 쿼리를 실행할 수 있습니다.

  // 연결 종료
  connection.close((err) => {
    if (err) {
      console.error('데이터베이스 연결 종료 오류:', err);
      return;
    }
    console.log('데이터베이스 연결이 종료되었습니다.');
  });
});
