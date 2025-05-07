import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BoardPage.css";

// 게시글 수정일 경우
const BoardPage = ({ onPostSubmitted }) => {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/board", {
        title,
        writer,
        content,
      });

      onPostSubmitted?.(response.data);
      navigate("/");
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      setError("게시글 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 취소 버튼
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="board-container">
      <h2>게시글 등록</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <div>
          <label>작성자</label>
          <input
            type="text"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            placeholder="작성자를 입력하세요"
            required
          />
        </div>

        <div>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            required
          />
        </div>

        <div className="button-container">
          <button type="submit" className="submit">
            등록
          </button>
          <button type="button" className="cancel" onClick={handleCancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardPage;
