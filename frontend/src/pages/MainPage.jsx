import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Pagination } from 'react-bootstrap';
import "./MainPage.css";

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/board/pages?page=${page}`)
      .then(response => {
        setPosts(response.data.data);
        setHasNextPage(response.data.data.length === 10);
      })
      .catch(err => console.error('목록 불러오기 실패', err));
  }, [page]);

  const goNext = () => setPage(prev => prev + 1);
  const goPrev = () => setPage(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">게시판</h2>
      
      {posts.length === 0 ? (
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
    </Container>
  );
};

export default MainPage;