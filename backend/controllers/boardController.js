const model = require('../models/boardModel'); 


exports.getBoradPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // 쿼리 파라미터에서 page 받음 (기본값 1) | url(라우트경로)이 /boards?page=1 이면 req.query.page  , /boards/page/1이면 req.params.page
    const [rows] = await model.getBoardPage(page);

    res.status(200).json({
      success: true,
      data: rows,
      currentPage: page,
    });
  } catch (error) {
    console.error('게시글 목록 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: '게시글 목록 조회 중 오류 발생',
    });
  }
};


exports.getBoardAll= async (req, res) => { //전체 목록
  try {
    const [rows] = await model.getBoardAll(); 
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBoard = async (req, res) => { //해당 게시글
  try {
    const [rows] = await model.getBoardById(req.params.id); //id 값 보냄
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBoard= async (req, res) => {
  try {
    await model.createBoard(req.body); //body통째로 보냄-post방식
    res.status(201).json({ message: 'board created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBoard= async (req, res) => {
  try {
    await model.updateBoard(req.params.id, req.body);
    res.json({ message: 'board updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    await model.deleteBoard(req.params.id);
    res.json({ message: 'board deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
