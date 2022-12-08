import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginPass from "../components/auth/LoginPass";

const Login = () => {
  const [sms, setSms] = useState(false);
  return (
    <div className="auth_login">
      <div className="auth_box">
        <h3 className="text-center mb-4 text-uppercase">Login</h3>
        <LoginPass />

        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <span className="col-6">
            <Link to="/forgot_password" className="col-6 link_class">
              Forgot Password
            </Link>
          </span>
          <span className="col-6" onClick={() => setSms(!sms)}>
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
      </div>
    </div>
  );
};

export default Login;
