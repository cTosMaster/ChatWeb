// 게시글 [내용] 페이지 - ContentPage.jsx
// [코드 수정 필요!!]

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, deletePost, increaseViewCount } from '../api/boardApi'; // api.js에서 함수 불러오기
import { Link } from 'react-router-dom';  // 링크 추가
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';


const ContentPage = () => {
  const { state } = useLocation();
  const { id } = useParams(); // URL에서 /post/:id 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState(state?.post || null);  // 우선 적용

  //해당 내용 가져오기.
  useEffect(() => {
    const loadPost = async () => {
      try {
        const viewedKey = `viewed_post_${id}`;
        const alreadyViewed = sessionStorage.getItem(viewedKey);

        if (state?.post) {
          setPost(state.post);
          if (!alreadyViewed) {
            await increaseViewCount(state.post.id);
            sessionStorage.setItem(viewedKey, 'true');
          }
        }
        else {
          const fetchedPost = await fetchPostById(id);
          setPost(fetchedPost);
          if (!alreadyViewed) {
            await increaseViewCount(fetchedPost.id);
            sessionStorage.setItem(viewedKey, 'true');
          }
        }
      } catch (err) {
        console.error('게시글 처리 중 오류:', err);
      }
    };

    loadPost();
  }, [id]);

  // 수정 함수
  const handleEdit = () => {
    if (!post) return;
    // 수정 페이지로 이동하는 함수
    navigate(`/edit/${post.id}`, { state: { post } });
  };

  const handleDelete = async () => {
    if (!post) return;
    try {
      const result = await deletePost(post.id);
      console.log("삭제 메시지:", result);

      // 성공 시
      if (result.message) {
        alert(result.message || 'Post deleted successfully');
        navigate('/'); // 삭제 후 메인 페이지로 이동
      }
      // 실패 시
      else if (result.error) {
        alert(result.error || 'Failed to delete post');
      }
    } catch (error) {
      alert('삭제 중 오류 발생');
      console.error(error);
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <Container style={{ maxWidth: '800px', marginTop: '50px' }}>
      <h2 className="mb-4">{post.title}</h2>
      <Row className="mb-4">
        {/* 조회수와 작성일을 같은 Row에 배치 */}
        <Col md="6">
          <p><strong>조회수:</strong> {post.view_cnt}</p>
        </Col>
        <Col md="6" className="text-end">
          <p><strong>작성일:</strong> {new Date(post.created_at).toLocaleString()}</p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          {/* 내용에 테두리 추가 */}
          <div
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <p style={{ marginBottom: 0 }}>작성자 : {post.writer}</p>
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          {/* 내용에 테두리 추가 */}
          <div
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#f9f9f9',
              minHeight: '350px',
            }}
          >
            <p>
              {post.content.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* 목록으로 돌아가기 버튼을 하단 왼쪽에 배치 */}
        <Col md="6">
          <Link to="/">
            <Button variant="secondary">목록으로 돌아가기</Button>
          </Link>
        </Col>

        <Col className="d-flex justify-content-end">
          <Button variant="primary" className="me-2" onClick={handleEdit}>
            수정
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ContentPage;
