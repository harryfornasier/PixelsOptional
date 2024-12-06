import { lazy, useEffect, useState } from "react";
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
import ProfileView from "./pages/ProfileView/ProfileView.jsx";
import About from "./pages/About/About.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LazyHome />} />
          <Route path="/about" element={<About />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:id" element={<Post loggedIn={loggedIn} />} />
          <Route path="/users/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/profile" element={<Profile setLoggedIn={setLoggedIn} />} />
          <Route path="/profile/:id" element={<ProfileView />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
