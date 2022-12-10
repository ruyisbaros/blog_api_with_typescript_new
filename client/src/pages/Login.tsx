import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPass from "../components/auth/LoginPass";
import LoginSMS from "../components/auth/LoginSMS";
import { ICurrentUser } from "../utils/Interfaces";
import GoogleLogin from "../components/auth/GoogleLogin";

const Login = () => {
  const navigate = useNavigate();
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;
  console.log(userObj);

  const [sms, setSms] = useState(false);

  useEffect(() => {
    if (userObj.token) {
      navigate("/");
    }
  }, [userObj.token]);

  return (
    <div className="auth_login">
      <div className="auth_box">
        <h3 className="text-center mb-4 text-uppercase">Login</h3>

        {sms ? <LoginSMS /> : <LoginPass />}

        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <span className="col-6">
            <Link to="/forgot_password" className="col-6 link_class">
              Forgot Password
            </Link>
          </span>
          <span className="col-6 text-end" onClick={() => setSms(!sms)}>
            {sms ? "Login with password" : "Login with SMS"}
          </span>
        </small>
        <p>
          Don't you have an account?
          <Link
            to="/register"
            style={{ color: "crimson" }}
            className="link_class mx-2"
          >
            Register Now!
          </Link>
        </p>
        <h6 className="text-center">OR</h6>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
