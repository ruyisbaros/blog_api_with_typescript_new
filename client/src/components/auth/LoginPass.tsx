import axios from "axios";
import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  userLoggedFinish,
  userLoggedStart,
  userLoggedSuccess,
} from "../../redux/currentUserSlicer";
import { InputChange, FormSubmit, ICurrentUser } from "../../utils/Interfaces";
import loadingGif from "../../images/loading.gif";

const LoginPass = () => {
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;
  console.log(userObj);
  console.log(userObj.logging);

  const dispatch = useDispatch();
  const [logUser, setLogUser] = useState({ account: "", password: "" });
  const [passType, setPassType] = useState(false);

  const handleLoginInput = (e: InputChange) => {
    const { name, value } = e.target;
    setLogUser({ ...logUser, [name]: value });
  };
  //console.log(logUser);
  const handleLogin = async (e: FormSubmit) => {
    e.preventDefault();
    try {
      dispatch(userLoggedStart());
      const res = await axios.post("/api/v1/auth/login", {
        ...logUser,
      });
      //console.log(res.data);
      dispatch(userLoggedFinish());
      dispatch(
        userLoggedSuccess({
          currentUser: res.data.user,
          message: res.data.message,
          token: res.data.access_token,
        })
      );
      localStorage.setItem("login", "true");
    } catch (error: any) {
      dispatch(userLoggedFinish());
      toast.error(error.response.data.message || error.response.data[0]);
    }
  };

  return (
    <form className="w-100" onSubmit={handleLogin}>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email | Phone Number
        </label>
        <input
          type="text"
          name="account"
          id="account"
          className="form-control"
          value={logUser.account}
          onChange={handleLoginInput}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="pass">
          <input
            type={passType ? "text" : "password"}
            name="password"
            id="password"
            className="form-control"
            value={logUser.password}
            onChange={handleLoginInput}
          />
          <small onClick={() => setPassType(!passType)}>
            {passType ? <BiShow size={18} /> : <BiHide size={18} />}
          </small>
        </div>
      </div>
      <button
        disabled={logUser.account && logUser.password ? false : true}
        className="btn btn-dark w-100 mt-2 login-btn"
        type="submit"
      >
        {userObj.logging ? <img src={loadingGif} alt="loading" /> : "Login"}
      </button>
    </form>
  );
};

export default LoginPass;
