import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ICurrentUser } from "../utils/Interfaces";
import { useSelector } from "react-redux";
/* import { toast } from "react-toastify";
import { loadingFinish, loadingStart } from "../redux/loadSlicer"; */
import UserInfo from "../components/profile/UserInfo";
import OtherInfo from "../components/profile/OtherInfo";
import UserBlogs from "../components/profile/UserBlogs";

const Profile = () => {
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;
  const { id } = useParams();

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
