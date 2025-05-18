import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CategoryPage from "./pages/CategoryPage";
import "./App.css";
import Login from "./components/Login";
import { useAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

function App() {

  const {showUserLogin} = useAppContext();
  return (
    <>
    <Toaster/>
      <Navbar />
      {showUserLogin ? <Login/>:null}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:categoryName" element={<CategoryPage />} />
      </Routes>
    </>
  );
}

export default App;
