import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FormSubmit, ICurrentUser } from "../../utils/Interfaces";
import loadingGif from "../../images/loading.gif";
import {
  userLoggedFinish,
  userLoggedStart,
  userLoggedSuccess,
} from "../../redux/currentUserSlicer";

const LoginSMS = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;
  const [phone, setPhone] = useState("");

  const verifySMS = async (phone: string) => {
    const code = prompt("Please enter the code which you received");
    if (!code) return;
    try {
      dispatch(userLoggedStart());
      const res = await axios.post("/api/v1/auth/sms_verify", { phone, code });
      console.log(res.data);
      if (res.data.valid) {
        dispatch(
          userLoggedSuccess({
            currentUser: res.data.user,
            message: res.data.message,
            token: res.data.access_token,
          })
        );
      }
      dispatch(userLoggedFinish());
      localStorage.setItem("login", "true");
    } catch (error: any) {
      dispatch(userLoggedFinish());
      toast.error(error.response.data.message || error.response.data[0]);
    }
  };

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login_with_sms", {
        phone,
      });
      //console.log(res.data);

      if (!res.data.valid) {
        verifySMS(phone);
      }
    } catch (error: any) {
      //dispatch(userLoggedFinish());
      toast.error(error.response.data.message || error.response.data[0]);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="phone" className="form-label">
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="example: +4917673881902"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-dark w-100 login-btn"
        disabled={phone ? false : true}
      >
        {userObj.logging ? <img src={loadingGif} alt="loading" /> : "Login"}
      </button>
    </form>
  );
};

export default LoginSMS;
