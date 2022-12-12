import React from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ICurrentUser } from "../../utils/Interfaces";
import { authLogout } from "../../redux/currentUserSlicer";

const Menu = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;

  const beforeLoginLinks = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];
  const afterLoginLinks = [
    { label: "Home", path: "/" },
    { label: "CreateBlog", path: "/create_blog" },
  ];

  const activeLinks = userObj.token ? afterLoginLinks : beforeLoginLinks;

  const isActive = (pn: string) => {
    if (pn === pathname) {
      return "active";
    }
  };
  const handleLogout = async () => {
    await axios.get("/api/v1/auth/logout");
    dispatch(authLogout());
    localStorage.removeItem("login");
    window.location.href = "/";
  };
  return (
    <ul className="navbar-nav ms-auto header_links">
      {activeLinks.map((link, index) => (
        <li
          key={index}
          className={`nav-item header_links_item ${isActive(link.path)}`}
        >
          <Link to={link.path} className="nav-link">
            {link.label}
          </Link>
        </li>
      ))}

      {userObj.currentUser.role === "Admin" && (
        <li className={`nav-item header_links_item ${isActive("/category")}`}>
          <Link to="/category" className="nav-link">
            Category
          </Link>
        </li>
      )}

      {userObj.currentUser && (
        <li className="nav-item dropdown mx-1">
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              className="current_user_avatar"
              src={userObj.currentUser.avatar}
              alt=""
            />
          </span>
          <ul
            className="dropdown-menu"
            aria-labelledby="navbarSupportedContent"
          >
            <li>
              <Link
                className="dropdown-item"
                to={`/profile/${userObj.currentUser._id}`}
              >
                Your Profile
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={`/profile/${userObj.currentUser._id}`}
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link onClick={handleLogout} className="dropdown-item" to="/">
                Logout
              </Link>
            </li>
          </ul>
        </li>
      )}
    </ul>
  );
};

export default Menu;
