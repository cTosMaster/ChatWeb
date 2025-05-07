// 게시글 [내용] 페이지 - PostContent.jsx
// [코드 수정 필요!!]

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deletePost } from '../api/boardApi'; // api.js에서 함수 불러오기
import axios from 'axios';
import { Link } from 'react-router-dom';  // 링크 추가
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const PostContent = () => {
  const { state } = useLocation();
  const { id } = useParams(); // URL에서 /post/:id 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState(state?.post || null);
  
  useEffect(() => {
    // state로 받은 post가 없으면 백엔드에서 직접 가져옴
    if (!post) {
      axios.get(`http://localhost:3001/api/board/${id}`)
        .then(response => {
          setPost(response.data.data);
        })
        .catch(err => console.error('게시글 불러오기 오류:', err));
    } else {
      // 조회수 증가
      axios.patch(`http://localhost:3001/api/board/${post.id}/view`)
        .catch(error => console.error('조회수 증가 오류:', error));
    }
  }, [id, post]);

  

  // 수정 함수
  const handleEdit = () => {
    // 수정 페이지로 이동하는 함수
    navigate(`/edit/${post.id}`, { state: { post } });

    /*
    const updatedData = {
      title: 'Updated Title', // 새로운 제목 (사용자가 입력한 데이터를 여기에 넣을 수 있다)
      content: 'Updated Content' // 새로운 내용 (사용자가 입력한 데이터를 여기에 넣을 수 있다)
    };
    */

    /*
    //api.js 생성으로 인한 수정
    axios.put(`http://localhost:3001/api/board/${id}`, updatedData)
      .then(() => {
        alert('Post updated successfully');
        // 필요 시 게시글 데이터를 다시 가져오기
        setPost({ ...post, ...updatedData });
      })
      .catch(error => console.error('게시글 수정 오류:', error));
    */

    /*
    const result = await editPost(id, updatedData);

    if (result.success) {
      alert('Post updated successfully');
      setPost({ ...post, ...updatedData });
    } else {
      alert(result.error || 'Failed to update post');
    }
    */
  };

  // 삭제 함수
  /* 
  // api.js 생성으로 인한 수정
  const handleDelete = () => {
    axios.delete(`http://localhost:3001/api/board/${id}`)
      .then(() => {
        alert('Post deleted successfully');
        navigate('/'); // 삭제 후 메인 페이지로 이동
      })
      .catch(error => console.error('게시글 삭제 오류:', error));
  }; */

  const handleDelete = async () => {
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
              minHeight: '350px',
            }}
>
            <p>{post.content}</p>
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

export default PostContent;
