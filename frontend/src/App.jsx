import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/TestMainPage";
import BoardMainPage from "./pages/BoardMainPage";
import BoardPage from "./pages/BoardPage";
import ContentPage from "./pages/ContentPage";
import ContentUpdatePage from "./pages/ContentUpdatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardMainPage />} />
        <Route path="/boardpage" element={<BoardPage />} />
        <Route path="/contentpage" element={<ContentPage />} />
        <Route path="/post/:id" element={<ContentPage />} />
        <Route path="/edit/:id" element={<ContentUpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
