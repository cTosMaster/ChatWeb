const db = require('../config/db');   // 연결객체를 불러와서 db 대입  

exports.getBoardAll = () => {
  return db.query('SELECT * FROM board');
};

exports.getBoardPage = (page) => {
  const size = 10;
  const offset = (page-1) * size;
  return db.query(
    'SELECT * FROM board LIMIT ? OFFSET ?',
    [size, offset]
  );
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
