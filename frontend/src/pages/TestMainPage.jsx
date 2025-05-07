import React, { useEffect, useState } from 'react';
import { fetchPostList } from '../api/boardApi';
import { Link } from 'react-router-dom';
import AuthCodeInput from "../security/AuthCodeInput";
import { Container, Card, Button, Row, Col, Pagination, Form } from 'react-bootstrap';
import "../css/TestMainPage.css";

const TestMainPage = () => {
  const [posts, setPosts] = useState([]);                   // 
  const [page, setPage] = useState(1);                      // 받은 페이지 변수 [게시글 : 10개 묶음]
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");       // 검색어 상태 추가

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
    <Container className="mt-5">
      <h2 className="mb-4 text-center">게시판</h2>

      <Form onSubmit={handleSearchSubmit} className="mb-4">
        {/* 인증 버튼 - 우측 상단 정렬 */}
        <Row className="mb-2">
          <Col>
            <div className="d-flex justify-content-end">
              {isVerified ? (
                <Button variant="success" disabled>인증됨</Button>
              ) : (
                <Button variant="warning" onClick={handleOpenAuth}>인증코드 입력</Button>
              )}
            </div>
          </Col>
        </Row>
        <Row className="g-2">
          <Col md="6">
            <Form.Control
              type="text"
              placeholder="게시글 검색"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>

          <Col md="3">
            <Button type="submit" variant="primary" className="w-100">검색</Button>
          </Col>
          <Col md="3">
            <Link to="/boardpage">
              <Button variant="secondary" className="w-100">
                게시글 등록
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>

      {!isVerified ? (
        <p className="text-center text-danger">인증되지 않은 사용자입니다.</p>
      ) : posts.length === 0 ? (
        <p className="text-center">게시글이 없습니다.</p>
      ) : (
        posts.map(post => (
          <Card key={post.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Link
                to={`/post/${post.id}`}
                state={{ post }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card.Title className="mb-2 hover-effect">{post.title}</Card.Title>
                <Card.Text className="text-muted small">
                  {new Date(post.created_at).toLocaleDateString()} · 조회수: {post.view_cnt}
                </Card.Text>
              </Link>
            </Card.Body>
          </Card>
        ))
      )}

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
    </Container>

  );
};

export default TestMainPage;