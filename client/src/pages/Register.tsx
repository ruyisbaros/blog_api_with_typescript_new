import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="auth_login">
      <div className="auth_box">
        <h3 className="text-center mb-4 text-uppercase">Register</h3>
        {/* {sms ? <LoginSMS /> : <LoginPass />} */}
        <RegisterForm />
        <p>
          Do you have an account?
          <Link
            to="/login"
            style={{ color: "teal" }}
            className="link_class mx-2"
          >
            Login Now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
