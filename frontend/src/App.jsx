import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BoardPage from "./pages/BoardPage";
import ContentPage from "./pages/PostContent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/boardpage" element={<BoardPage />} />
        <Route path="/contentpage" element={<ContentPage />} />
        <Route path="/post/:id" element={<ContentPage />} />
        <Route path="/edit/:id" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
