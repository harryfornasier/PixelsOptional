import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home/Home.jsx";
const LazyHome = lazy(() => import("./pages/Home/Home.jsx"));
import Upload from "./pages/Upload/Upload.jsx";
import Post from "./pages/Post/Post.jsx";
import "./app.scss";
import Header from "./components/Header/Header.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LazyHome />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
