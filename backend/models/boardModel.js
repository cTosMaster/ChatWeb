const db = require('../config/db');   // 연결객체를 불러와서 db 대입  

exports.getBoardAll = () => {
  return db.query('SELECT * FROM board');
};

exports.getBoardPage = (page, search = '') => {
  const size = 10;
  const offset = (page - 1) * size;

  // 검색어가 있을 경우에만 WHERE 조건 추가
  const baseQuery = `SELECT * FROM board ${search ? 'WHERE title LIKE ?' : ''} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  const params = search ? [`%${search}%`, size, offset] : [size, offset];

  return db.query(baseQuery, params);
};

exports.getBoard = (id) => {
  return db.query('SELECT * FROM board WHERE id = ?', [id]);
};

exports.createBoard = (data) => {
  const { title, content, writer } = data;
  return db.query(
    'INSERT INTO board (title, content, writer) VALUES (?, ?, ?)',
    [title, content, writer]
  );
};


exports.updateBoard = (id, data) => {
  const { title, content, writer } = data;
  return db.query(
    'UPDATE board SET title = ?, content = ?, writer = ? WHERE id = ?',
    [title, content, writer, id]
  );
};

exports.deleteBoard = (id) => {
  return db.query('DELETE FROM board WHERE id = ?', [id]);
};

