import React, { useState } from "react";
import axios from "axios";

const PostForm = ({ onPostSubmitted }) => {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/board", {
        title,
        content,
      });

      if (response.status === 201) {
        // 게시글 등록 성공 시 콜백 함수 호출 (부모 컴포넌트에 전달된 onPostSubmitted 호출)
        onPostSubmitted(response.data);
      }
    } catch (error) {
      console.error("게시글 등록 실패:", error);
    }
  };

  return (
    <div>
      <h2>게시글 등록</h2>
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

        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default PostForm;
