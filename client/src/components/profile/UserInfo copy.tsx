import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormSubmit, ICurrentUser } from "../../utils/Interfaces";
import { BiShow, BiHide } from "react-icons/bi";
import NotFound from "../../pages/NotFound";
import { toast } from "react-toastify";
import axios from "axios";
import { loadingFinish, loadingStart } from "../../redux/loadSlicer";

const UserInfo = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;
  const [passType, setPassType] = useState(false);
  const [confPassType, setConfPassType] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userProfile, setUserProfile] = useState({
    name: "",
    account: userObj.currentUser.account,
    avatar: "" as any,
    password: "",
  });
  const { name, avatar, account, password } = userProfile;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    //console.log(files);
    if (files) {
      const file = files[0];
      //console.log(file);
      setUserProfile({ ...userProfile, avatar: file });
    } else {
      alert("Please select an image");
    }
  };
  console.log(userProfile);
  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    if (avatar || name) {
      console.log(avatar, name);
      try {
        dispatch(loadingStart());
        /*const res = await axios.patch(
              `/api/v1/users/update_one/${userObj.currentUser._id}`,
              { name,avatar }
            );*/
        dispatch(loadingFinish());
      } catch (error: any) {
        dispatch(loadingFinish());
        toast.error(error.response.data.message || error.response.data[0]);
      }
    }
  };
  if (!userObj.currentUser) return <NotFound />;
  return (
    <form className="profile_info" onSubmit={handleSubmit}>
      <div className="info_avatar">
        <img
          src={
            avatar ? URL.createObjectURL(avatar) : userObj.currentUser.avatar
          }
          alt="avatar"
        />
        <span>
          <i className="fas fa-camera"></i>
          <label htmlFor="file_up">Change</label>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file_up"
            onChange={handleChangeAvatar}
          />
        </span>
      </div>
      <div className="form-group my-3">
        <label htmlFor="account" className="form-label">
          Account
        </label>
        <input
          type="text"
          name="account"
          id="account"
          disabled={true}
          className="form-control"
          defaultValue={userObj.currentUser.account}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          defaultValue={userObj.currentUser.name}
          onChange={handleChange}
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
            defaultValue={password}
            onChange={handleChange}
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
      <button type="submit" className="btn btn-dark w-100">
        Update
      </button>
    </form>
  );
};

export default UserInfo;
