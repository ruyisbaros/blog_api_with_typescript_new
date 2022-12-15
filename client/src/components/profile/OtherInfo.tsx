import React, { useState, useEffect } from "react";
import { loadingFinish, loadingStart } from "../../redux/loadSlicer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IOtherUser, IUser } from "../../utils/Interfaces";
import { otherUserFetched } from "../../redux/otherUserSlicer";
import Snipper from "../global/Snipper";
import moment from "moment";

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
        dispatch(
          otherUserFetched({ user: res.data.user, blogs: res.data.blogs })
        );

        dispatch(loadingFinish());
      } catch (error: any) {
        dispatch(loadingFinish());
        toast.error(error.response.data.message || error.response.data[0]);
      }
    };
    profile();
  }, [id]);
  if (!otherUser) return <Snipper />;
  return (
    <div className="profile_info text-center rounded">
      <div className="info_avatar">
        <img src={otherUser.avatar} alt={otherUser.name} />
      </div>
      <h5 className="text-uppercase text-danger">{otherUser.role}</h5>
      <h6>
        Name:{" "}
        <span className="text-info text-capitalize">{otherUser.name}</span>
      </h6>
      <div>Email address / Phone number:</div>
      <span className="text-info ">{otherUser.account}</span>
      <div>
        Join Date:{" "}
        <span style={{ color: "#ffc107" }}>
          {moment(otherUser.createdAt).format("MMM Do YY")}
        </span>
      </div>
    </div>
  );
};

export default OtherInfo;
