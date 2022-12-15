import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ICurrentUser } from "../utils/Interfaces";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loadingFinish, loadingStart } from "../redux/loadSlicer";
import UserInfo from "../components/profile/UserInfo";
import OtherInfo from "../components/profile/OtherInfo";
import UserBlogs from "../components/profile/UserBlogs";
import { fetchBlogs } from "../redux/blogSlicer";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const getBlogsByUser = async () => {
      try {
        dispatch(loadingStart());
        const res = await axios.get(`/api/v1/blogs/creator/get_all/${id}`);
        console.log(res);
        dispatch(fetchBlogs(res.data));
        dispatch(loadingFinish());
      } catch (error: any) {
        dispatch(loadingFinish());
        toast.error(error.response.data.message);
      }
    };
    getBlogsByUser();
  }, [id, dispatch]);

  return (
    <div className="row my-3">
      <div className="col-md-5 mb-3">
        {id === userObj.currentUser._id ? <UserInfo /> : <OtherInfo />}
      </div>
      <div className="col-md-7">
        <UserBlogs />
      </div>
    </div>
  );
};

export default Profile;
