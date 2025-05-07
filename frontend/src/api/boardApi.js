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

export const deletePost = async (id) => {
  try{
    const response = await axios.delete(`${BASE_URL}/${id}`);
    console.log("서버 응답:", response.data);//응답 확인
    return response.data//서버에서 반환된 데이터
  }catch(error){
    console.log("삭제 에러:", error);
    if(error.response && error.response.data){
        return{
          error: error.res?.data?.error || '서버 오류 발생'
      };
    }
  }
};

// 게시글 조회수 증가 <미적용>
export const increaseViewCount = (id) =>
  axios.patch(`${BASE_URL}/${id}/view`).then((res) => res.data);