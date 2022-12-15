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
import { IBlogs, ICurrentUser, ILoadingStatus } from "./utils/Interfaces";
import Loading from "./components/alerts/Loading";
import ActivateAccount from "./pages/ActivateAccount";
import { refreshToken, userLoggedFinish } from "./redux/currentUserSlicer";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import { fetchCategories } from "./redux/categorySlicer";
import CreateBlog from "./pages/CreateBlog";
import { fetchBlogs } from "./redux/blogSlicer";
import SingleBlog from "./pages/SingleBlog";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector<IBlogs>((store) => store.blogs);
  console.log(blogs);
  const loadStatus = useSelector<ILoadingStatus>(
    (store) => store.loadStatus.loading
  );
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;
  console.log(userObj);
  //console.log(userObj.logging);
  //console.log(loadStatus);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const refreshTokenFunc = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/refresh_token");
        //console.log(data);
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

  useEffect(() => {
    if (userObj.currentUser) {
      if (userObj.currentUser.role === "Admin") {
        setIsAdmin(true);
      }
    }
  }, [userObj.currentUser]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await axios.get("/api/v1/categories/get_all");
      dispatch(fetchCategories(res.data));
    };
    fetchAllCategories();
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
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/create_blog" element={<CreateBlog />} />
          <Route path="/blogs/:title" element={<SingleBlog />} />
          <Route
            path="/category"
            element={isAdmin ? <Category /> : <NotFound />}
          />
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
