import React, { useEffect, useState } from "react";
import { fetchPostList } from "../api/boardApi";
import '../css/BoardMainPage.css';

/* 페이지당 노출되는 게시물 수*/
const POSTS_PER_PAGE = 10;

function BoardMainPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);   // 현재 페이지

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchPostList();
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sorted);
      } 
      catch (err) {
        console.error("게시글 불러오기 오류:", err);
      } 
      finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);

  if (loading) return <div className="board-empty">불러오는 중...</div>;

  if (posts.length === 0) {
    return (
      <div className="board-container">
        <h1 className="board-title">게시판</h1>
        <div className="board-empty">게시물이 없습니다.</div>
      </div>
    );
  }

  // 1페이지면 0~9, 2페이지면 10~19 ...
  const indexOfLast = currentPage * POSTS_PER_PAGE;
  const indexOfFirst = indexOfLast - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  // placeholder 개수 계산
  const placeholders = POSTS_PER_PAGE - currentPosts.length;

  return (
    <div className="board-container">
      <h1 className="board-title">노티스텔</h1>
      <p className="board-desc">우리 집에 대한 따끈한 소식이 있어요!</p>
      <table className="board-table">
        <thead>
          <tr>
            <th style={{width: '60px'}}>번호</th>
            <th style={{width: '60%'}}>제목</th>
            <th style={{width: '120px'}}>작성자</th>
            <th style={{width: '160px'}}>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td style={{textAlign: "left"}}>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
            </tr>
          ))}
          {/* placeholder 라인 추가 */}
          {[...Array(placeholders)].map((_, idx) => (
            <tr key={`placeholder-${idx}`} className="placeholder-row">
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>이전</button>
        <span style={{margin: '0 16px'}}>
          {currentPage} / {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>다음</button>
      </div>
    </div>
  );
}

export default BoardMainPage;