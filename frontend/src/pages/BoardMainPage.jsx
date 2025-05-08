import React, { useEffect, useState } from "react";
import { fetchPostList } from "../api/boardApi";
import { useNavigate , Link} from 'react-router-dom';
import '../css/BoardMainPage.css';
import AuthCodeInput from "../security/AuthCodeInput";
import { Form, Button, Row, Col, Pagination } from 'react-bootstrap';

/* 페이지당 노출되는 게시물 수*/
const POSTS_PER_PAGE = 10;

const BoardMainPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);  // 받은 페이지 변수 [게시글 : 10개 묶음]
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");       // 검색어 상태 추가
  const [totalPages, setTotalPages] = useState(1);

    // 인증 처리 부분
    const [isVerified, setIsVerified] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);


    useEffect(() => {
      const verified = sessionStorage.getItem("authCodeVerified");
      if (verified === "true") {
        setIsVerified(true);
      }
    }, []);

    useEffect(() => {
      if (!isVerified) return;
      fetchPostList(page, searchQuery)
        .then(data => {
          console.log("받은 데이터:", data);
          setPosts(data);
          setTotalPages(data.totalPages); 
          setHasNextPage(data.length === 10);
        })
        .catch(err => console.error('목록 불러오기 실패', err));
    }, [page, searchQuery, isVerified]);

    const goNext = () => setPage(prev => prev + 1);
    const goPrev = () => setPage(prev => (prev > 1 ? prev - 1 : 1));


  //페이지 출력 처리
  const handleSearchChange = (e) => setSearchQuery(e.target.value); // 검색어 입력값 변경 처리
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // 검색할 때 페이지는 첫 번째로 리셋
  };

  // 인증 버튼 핸들러
  const handleOpenAuth = () => setShowAuthModal(true);
  const handleCloseAuth = () => setShowAuthModal(false);
  const handleAuthSuccess = () => {
    setIsVerified(true);
    setPage(1); // 인증되면 페이지 리셋
  };

  return (
    <div className="board-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px' }}>
      <h1 className="board-title">노티스텔</h1>
      <p className="board-desc">우리 집에 대한 따끈한 소식이 있어요!</p>
      <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '16px' }}>
        {/* 인증 버튼 - 우측 상단 정렬 */}
                <Row className="mb-2">
                  <Col>
                    <div className="d-flex justify-content-end">
                      {isVerified ? (
                        <Button variant="success" style={{width: '80px', marginRight:'-30px'}} disabled>인증됨</Button>
                      ) : (
                        <Button variant="warning" onClick={handleOpenAuth} style={{width: '120px', marginRight:'-30px'}}  >인증코드 입력</Button>
                      )}
                       </div>  
                  </Col>
                </Row>
    <Row className="justify-content-end" style={{ marginRight: '0', marginLeft: '0', gap: '8px' }}>
        <Col xs="auto" style={{ paddingRight: '0px' }}>
            <Form.Control
                type="text"
                placeholder="게시글 검색"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ minWidth: '230px', borderRadius: '8px', padding: '8px' }}
            />
        </Col>
        <Col xs="auto" style={{ paddingLeft: '0px' }}>
            <Button 
                type="submit" 
                variant="primary" 
                style={{ minWidth: '80px', padding: '9px', borderRadius: '8px', marginRight:'-42px' }}
                onClick={handleSearchSubmit}
            >
                검색
            </Button>
        </Col>
    </Row>
      </div>
      {!isVerified ? (
        <p className="text-center text-danger">인증되지 않은 사용자입니다.</p>
      ) : posts.length === 0 ? (
        <p className="text-center">게시글이 없습니다.</p>
      ) : (
      <table className="board-table">
        <thead>
          <tr>
            <th style={{width: '45%'}}>제목</th>
            <th style={{width: '164px'}}>작성자</th>
            <th style={{width: '160px'}}>작성일자</th>
            <th style={{width: '120px'}}>조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
                   <tr key={post.id} style={{ cursor: 'pointer' }}>
            <Link 
                to={`/post/${post.id}`} 
                state={{post}} 
                style={{ 
                    display: 'contents', 
                    textDecoration: 'none', 
                    color: 'inherit' 
                }}
            >
                <td style={{ textAlign: 'center' }}>{post.title}</td>
                <td>{post.writer}</td>
                <td>{new Date(post.created_at).toISOString().split('T')[0]}</td>
                <td>{post.view_cnt}</td>
            </Link>
    </tr>
          ))}

        </tbody>
      </table>
      )}



      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>

          <Pagination.Prev onClick={goPrev} disabled={page === 1} />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next onClick={goNext} disabled={!hasNextPage} />
        </Pagination>
      </div>
      <AuthCodeInput
        show={showAuthModal}
        onClose={handleCloseAuth}
        onSuccess={handleAuthSuccess}
      />

    </div>
  );
}

export default BoardMainPage;