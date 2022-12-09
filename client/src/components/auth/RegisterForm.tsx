import React, { useState } from "react";
import { InputChange, FormSubmit, ICurrentUser } from "../../utils/Interfaces";
import loadingGif from "../../images/loading.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import {
  userLoggedFinish,
  userLoggedStart,
  userLoggedSuccess,
} from "../../redux/currentUserSlicer";

const RegisterForm = () => {
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;
  console.log(userObj);
  console.log(userObj.logging);

  const dispatch = useDispatch();
  const [regUser, setRegUser] = useState({
    name: "",
    account: "",
    password: "",
  });
  const [passType, setPassType] = useState(false);
  const [confPassType, setConfPassType] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegisterInput = (e: InputChange) => {
    const { name, value } = e.target;
    setRegUser({ ...regUser, [name]: value });
  };
  //console.log(regUser);
  const handleRegister = async (e: FormSubmit) => {
    e.preventDefault();
    if (regUser.password === confirmPassword) {
      try {
        dispatch(userLoggedStart());
        const res = await axios.post("/api/v1/auth/register", {
          ...regUser,
        });
        //console.log(res.data);
        dispatch(userLoggedFinish());
        toast.success(res.data.message);
        dispatch(
          userLoggedSuccess({
            message: res.data.message,
          })
        );
      } catch (error: any) {
        dispatch(userLoggedFinish());
        toast.error(error.response.data.message || error.response.data[0]);
      }
    } else {
      toast.error("Passwords should match");
    }
  };

  return (
    <form className="w-100" onSubmit={handleRegister}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={regUser.name}
          onChange={handleRegisterInput}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email | Phone Number
        </label>
        <input
          type="text"
          name="account"
          id="account"
          className="form-control"
          value={regUser.account}
          onChange={handleRegisterInput}
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
            value={regUser.password}
            onChange={handleRegisterInput}
          />
          <small onClick={() => setPassType(!passType)}>
            {passType ? <BiShow size={18} /> : <BiHide size={18} />}
          </small>
        </div>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="conf_password" className="form-label">
          Confirm Password
        </label>
        <div className="pass">
          <input
            type={confPassType ? "text" : "password"}
            name="conf_password"
            id="conf_password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <small onClick={() => setConfPassType(!confPassType)}>
            {confPassType ? <BiShow size={18} /> : <BiHide size={18} />}
          </small>
        </div>
      </div>
      <button
        disabled={
          regUser.name && regUser.account && regUser.password ? false : true
        }
        className="btn btn-dark w-100 mt-2 login-btn"
        type="submit"
      >
        {userObj.logging ? <img src={loadingGif} alt="loading" /> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
