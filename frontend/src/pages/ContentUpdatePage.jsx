// 게시글 [내용] 페이지 - ContentUpdatePage.jsx

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { updatePost } from "../api/boardApi";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ContentUpdatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialPost = location.state?.post;
    const { id } = useParams();

    const [post, setPost] = useState({
        id: initialPost?.id || "",
        title: initialPost?.title || "",
        content: initialPost?.content || "",
        writer: initialPost?.writer || "",
        view_cnt: initialPost?.view_cnt || 0,
        created_at: initialPost?.created_at || new Date().toISOString()
    });

    if (!post) return <div>게시글 정보를 불러올 수 없습니다.</div>;

    // 수정 처리
    const handleEdit = async () => {
        try {
            const { id, title, content, writer } = post;
            await updatePost(id, { title, content, writer });
            alert("게시글이 수정되었습니다.");
            navigate(`/post/${id}`, { state: { post } });
        }
        catch (err) {
            console.error("수정 실패:", err);
            // increaseView(post.id).catch(err => console.error("조회수 증가 오류:", err));
            alert("게시글 수정 중 오류가 발생했습니다.");
        }
    };

    // 수정취소 버튼 -> 메인 페이지 이동
    const handleCancel = () => {
        navigate("/");
    };

    return (
        <Container style={{ maxWidth: "800px", marginTop: "50px" }}>
            <h2 className="mb-4">
                <Form.Control
                    type="text"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    placeholder="제목을 입력하세요"
                />
            </h2>

            <Row className="mb-4">
                <Col md="6">
                    <p><strong>조회수:</strong> {post.view_cnt}</p>
                </Col>
                <Col md="6" className="text-end">
                    <p><strong>수정일:</strong> {new Date(post.created_at).toLocaleString()}</p>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <Form.Control
                        type="text"
                        value={post.writer}
                        onChange={(e) => setPost({ ...post, writer: e.target.value })}
                        placeholder="작성자"
                    />
                </Col>
            </Row>
            
            <Row className="mb-3">
                <Col>
                    <div
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "16px",
                            backgroundColor: "#f9f9f9",
                            minHeight: "350px",
                        }}
                    >
                        <Form.Control
                            as="textarea"
                            rows={12}
                            value={post.content}
                            onChange={(e) => setPost({ ...post, content: e.target.value })}
                            placeholder="내용을 입력하세요"
                            style={{ border: "none", backgroundColor: "transparent", resize: "none" }}
                        />
                    </div>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col className="d-flex justify-content-end">
                    <Button variant="primary" className="me-2" onClick={handleEdit}>
                        수정완료
                    </Button>
                    <Button variant="danger" onClick={handleCancel}>
                        수정취소
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ContentUpdatePage;
