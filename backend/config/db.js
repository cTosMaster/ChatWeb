
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'noticetel',
  password: 'noticetel12#$', // 실제 비밀번호로 변경
  database: 'noticetel'
});

module.exports = pool.promise();
