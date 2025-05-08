import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestMainPage from "./pages/TestMainPage";
import BoardMainPage from "./pages/BoardMainPage";
import BoardPage from "./pages/BoardPage";
import ContentPage from "./pages/ContentPage";
import ContentUpdatePage from "./pages/ContentUpdatePage";
import ProtectedRoute from "./security/ProtectedRoute"; // 인증된 사용자만 라우팅

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardMainPage />} />
        {/* 인증된 사용자만 접근 가능 */}
        <Route
          path="/boardpage"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contentpage"
          element={
            <ProtectedRoute>
              <ContentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <ContentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <ContentUpdatePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
