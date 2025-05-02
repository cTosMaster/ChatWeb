
const express = require('express');
const router = express.Router();
const controller = require('../controllers/boardController');

// 게시글 전체 조회
router.get('/getall', controller.getBoardAll);

// 게시글 단일 조회 (id를 URL 파라미터로 받음)
router.get('/:id', controller.getBoard);

// 게시글 생성 (JSON body 사용)
router.post('/', controller.createBoard);

// 게시글 수정 (id는 URL에서, 내용은 JSON body)
router.put('/:id', controller.updateBoard);

// 게시글 삭제 (id는 URL 파라미터로)
router.delete('/:id', controller.deleteBoard);

module.exports = router;
