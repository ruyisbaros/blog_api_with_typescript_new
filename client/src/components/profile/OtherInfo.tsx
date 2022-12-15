import React, { useState, useEffect } from "react";
import { loadingFinish, loadingStart } from "../../redux/loadSlicer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IOtherUser, IUser } from "../../utils/Interfaces";
import { otherUserFetched } from "../../redux/otherUserSlicer";

const OtherInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const otherUserBox = useSelector<IOtherUser>((store) => store.otherUser);
  const { otherUser } = otherUserBox as IOtherUser;

  useEffect(() => {
    if (!id) return;
    const profile = async () => {
      try {
        dispatch(loadingStart());
        const res = await axios.get(`/api/v1/users/get_user/${id}`);
        console.log(res.data);
        dispatch(otherUserFetched(res.data));

        dispatch(loadingFinish());
      } catch (error: any) {
        dispatch(loadingFinish());
        toast.error(error.response.data.message || error.response.data[0]);
      }
    };
    profile();
  }, [id]);

  return <div>OtherInfo</div>;
};

export default OtherInfo;
