import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { refreshToken, userLoggedFinish } from "./redux/currentUserSlicer";

function App() {
  const dispatch = useDispatch();
  const loadStatus = useSelector<ILoadingStatus>(
    (store) => store.loadStatus.loading
  );

  //console.log(loadStatus);
  useEffect(() => {
    const refreshTokenFunc = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/refresh_token");
        console.log(data);
        dispatch(
          refreshToken({
            token: data.accessToken,
            currentUser: data.current_user,
          })
        );
      } catch (error: any) {
        dispatch(userLoggedFinish());
        alert(error.response.data.message);
      }
    };
    if (localStorage.getItem("login")) {
      refreshTokenFunc();

      setTimeout(() => {
        refreshTokenFunc();
      }, 13 * 24 * 60 * 60 * 1000); //13 days
    }
  }, [dispatch]);
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
