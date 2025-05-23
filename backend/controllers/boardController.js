const model = require('../models/boardModel'); 


exports.getBoardPage = async (req, res) => {      // 페이지 역순 10개 1페이지 응답
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || ''; // 검색어가 있을 수도, 없을 수도 있음
    const [rows] = await model.getBoardPage(page, search);

    res.status(200).json({
      success: true,
      data: rows,
      currentPage: page,
    });
  } 
  catch (error) {
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

exports.getBoardById = async (req, res) => { //해당 게시글
  try {
    const [rows] = await model.getBoardById(req.params.id); //id 값 보냄
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBoard= async (req, res) => {  try {
    await model.createBoard(req.body); //body통째로 보냄-post방식
    res.status(201).json({ message: 'board created' });
  } 
  catch (err) {
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
    res.json({ message: 'board deleted' }); //성공 시 
  } catch (err) {
    res.status(500).json({ error: err.message }); //실패 시
  }
};

exports.incrementViewCnt = async (req, res) => {
  try {
    const [result] = await model.incrementViewCnt(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'ViewCnt Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};