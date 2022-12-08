import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

import { InputChange } from "../../utils/Interfaces";

const LoginPass = () => {
  const [logUser, setLogUser] = useState({ account: "", password: "" });
  const [passType, setPassType] = useState(false);

  const handleLoginInput = (e: InputChange) => {
    const { name, value } = e.target;
    setLogUser({ ...logUser, [name]: value });
  };
  //console.log(logUser);
  const handleLogin = (e: InputChange) => {
    e.preventDefault();
  };

  return (
    <form className="w-100 mx-auto">
      <div className="form-group">
        <label htmlFor="account">Email | Phone Number</label>
        <input
          type="text"
          name="account"
          id="account"
          className="form-control"
          value={logUser.account}
          onChange={handleLoginInput}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
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
            {passType ? <BiShow /> : <BiHide />}
          </small>
        </div>
      </div>
      <button
        disabled={logUser.account && logUser.password ? false : true}
        className="btn btn-dark w-50 mx-auto d-block"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginPass;
