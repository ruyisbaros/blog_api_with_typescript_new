import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import { ILoadingStatus } from "./utils/Interfaces";
import Loading from "./components/alerts/Loading";
import ActivateAccount from "./pages/ActivateAccount";

function App() {
  const dispatch = useDispatch();
  const loadStatus = useSelector<ILoadingStatus>(
    (store) => store.loadStatus.loading
  );

  //console.log(loadStatus);
  return (
    <div className="mother_container">
      <BrowserRouter>
        <>
          {loadStatus && <Loading />}
          <ToastContainer position="bottom-center" limit={1} />
          <Header />
        </>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/activate_account/:token"
            element={<ActivateAccount />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
