import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ICurrentUser } from "../utils/Interfaces";
import { useDispatch, useSelector } from "react-redux";
/* import { toast } from "react-toastify";
import { loadingFinish, loadingStart } from "../redux/loadSlicer"; */
import UserInfo from "../components/profile/UserInfo";
import OtherInfo from "../components/profile/OtherInfo";
import UserBlogs from "../components/profile/UserBlogs";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;
  const { id } = useParams();
  /* useEffect(() => {
    const profile = async () => {
      try {
        dispatch(loadingStart());
        const res = await axios.get(`/api/v1/users/get_user/${id}`);
        console.log(res.data);
        dispatch(loadingFinish());
      } catch (error: any) {
        dispatch(loadingFinish());
        toast.error(error.response.data.message || error.response.data[0]);
      }
    };
    profile();
  }, [id]); */
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
