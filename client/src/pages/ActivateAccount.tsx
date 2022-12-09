import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { loadingFinish, loadingStart } from "../redux/loadSlicer";
import { userLoggedSuccess } from "../redux/currentUserSlicer";

const ActivateAccount = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  //console.log(token);
  const [isActive, setIsActive] = useState(false);
  const [userActivated, setUserActivated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsActive(true);
    }
  }, []);
  //console.log(isActive);
  useEffect(() => {
    if (isActive) {
      const activateAccount = async () => {
        try {
          dispatch(loadingStart());
          const res = await axios.get(`/api/v1/auth/activate_account/${token}`);
          console.log(res);
          setUserActivated(true);
          dispatch(loadingFinish());
          dispatch(
            userLoggedSuccess({
              currentUser: res.data.newUser,
              message: res.data.message,
              token: res.data.access_token,
            })
          );
        } catch (error: any) {
          dispatch(loadingFinish());
          toast.error(error.response.data.message || error.response.data[0]);
        }
      };
      activateAccount();
    }
  }, [isActive]);
  return (
    <div className="activate_account">
      {userActivated && (
        <>
          <h3 className="text-center mt-4">
            Hello. Your account has been activated
          </h3>
          <p className="text-center">
            Close the page or turn <Link to="/">Home</Link> page
          </p>
        </>
      )}
    </div>
  );
};

export default ActivateAccount;
