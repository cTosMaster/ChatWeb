
import axios from "axios";

const BASE_URL = "http://localhost:3001/api/board";

//게시글 페이지 조회
export const fetchPostList = (page = 1, searchQuery = "") => {
  const queryParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";
  return axios.get(`${BASE_URL}/pages?page=${page}${queryParam}`)
              .then(res => res.data.data);
};

// 게시글 id 단일 조회
export const fetchPostById = (id) =>
  axios.get(`${BASE_URL}/${id}`).then((res) => res.data);

// 게시글 생성
export const createPost = (post) =>
  axios.post(`${BASE_URL}/`, post).then((res) => res.data);

// 게시글 수정
export const updatePost = (id, post) =>
  axios.put(`${BASE_URL}/${id}`, post).then((res) => res.data);

// 게시글 삭제
export const deletePost = (id) =>
  axios.delete(`${BASE_URL}/${id}`).then((res) => res.data);