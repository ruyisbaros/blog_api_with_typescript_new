import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const beforeLoginLinks = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];
  return (
    <ul className="navbar-nav ms-auto">
      {beforeLoginLinks.map((link, index) => (
        <li key={index}>
          <Link to={link.path} className="nav-link">
            {link.label}
          </Link>
        </li>
      ))}

      <li className="nav-item dropdown mx-1">
        <span
          className="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          User Name
        </span>
        <ul className="dropdown-menu" aria-labelledby="navbarSupportedContent">
          <li>
            <Link className="dropdown-item" to="/profile">
              Your Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/edit_profile">
              Edit Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="/">
              Logout
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Menu;
