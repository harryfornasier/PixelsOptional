import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home/Home.jsx";
import Upload from "./pages/Upload/Upload.jsx";
import Post from "./pages/Post/Post.jsx";
import "./app.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
