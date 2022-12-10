import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ILoadingStatus } from "../utils/Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadingFinish, loadingStart } from "../redux/loadSlicer";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
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
  }, [id]);
  return <div>Profile</div>;
};

export default Profile;
