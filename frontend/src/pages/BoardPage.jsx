import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 다른 페이지로 이동하는 hook
import "./BoardPage.css";

const BoardPage = () => {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // 비동기
    e.preventDefault(); // 새로고침 X -> handleSubmit
    try {
      const res = await axios.post("http://localhost:3001/api/board", {
        title,
        content,
	writer
      });

      navigate(`/RegisterPage/ `); // 내용 페이지 이동
    } catch (err) {
      console.error("등록 실패", err);
    }
  };

  return (
    <div className="board-container">
      <h2>게시글 등록</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="작성자"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
          required
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default BoardPage;
