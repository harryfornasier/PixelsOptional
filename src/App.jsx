import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home/Home.jsx";
import Upload from "./pages/Upload/Upload.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
