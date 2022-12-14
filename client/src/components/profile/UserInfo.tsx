import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormSubmit, ICurrentUser } from "../../utils/Interfaces";
import { BiShow, BiHide } from "react-icons/bi";
import NotFound from "../../pages/NotFound";
import { toast } from "react-toastify";
import axios from "axios";
import { loadingFinish, loadingStart } from "../../redux/loadSlicer";
import { checkImage, uploadImage } from "../../utils/ImageUpload";
import { updateCurrentUser } from "../../redux/currentUserSlicer";

const UserInfo = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;
  console.log(userObj);
  const [userProfile, setUserProfile] = useState({
    name: userObj.currentUser.name,
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
      //console.log(avatar, name);
      let url = userObj.currentUser.avatar;
      if (avatar) {
        const check = checkImage(avatar);
        if (check) return toast.error(check);
        dispatch(loadingStart());
        const photo = await uploadImage(avatar);
        //console.log(photo);
        url = photo.url;
        dispatch(loadingFinish());
      }
      try {
        dispatch(loadingStart());
        const res = await axios.patch(
          `/api/v1/users/update_user`,
          {
            name,
            avatar: url,
          },
          {
            headers: {
              Authorization: userObj.token,
            },
          }
        );
        dispatch(
          updateCurrentUser({
            token: userObj.token,
            currentUser: res.data.user,
          })
        );
        toast.success(res.data.message);
        console.log(res);
        dispatch(loadingFinish());
      } catch (error: any) {
        dispatch(loadingFinish());
        toast.error(error.response.data.message || error.response.data[0]);
      }
    }
  };

  //PWD RESET
  const [currentPassType, setCurrentPassType] = useState(false);
  const [newpassType, setNewPassType] = useState(false);
  const [confPassType, setConfPassType] = useState(false);

  const [pwdCredentials, setPwdCredentials] = useState({
    current_password: "",
    new_password: "",
    conf_password: "",
  });
  const { current_password, new_password, conf_password } = pwdCredentials;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPwdCredentials({ ...pwdCredentials, [name]: value });
  };

  const updatePassword = async (e: FormSubmit) => {
    e.preventDefault();
    if (new_password === conf_password) {
      try {
        dispatch(loadingStart());
        const { data } = await axios.patch(
          `/api/v1/users/update_pwd`,
          { current_password, new_password },
          {
            headers: {
              Authorization: userObj.token,
            },
          }
        );
        dispatch(loadingFinish());
        setPwdCredentials({
          ...pwdCredentials,
          current_password: "",
          new_password: "",
          conf_password: "",
        });
        toast.success(data.message);
      } catch (error: any) {
        dispatch(loadingFinish());
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Passwords do not match!");
    }
  };

  if (!userObj.currentUser) return <NotFound />;
  return (
    <>
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

        {/* <div className="form-group mb-3">
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
      </div> */}
        <button type="submit" className="btn btn-dark w-100">
          Update Profile
        </button>
        {/* RESET PWD */}
      </form>
      <form className="reset_pwd" onSubmit={updatePassword}>
        <h4 className="text-center my-4">Reset Password</h4>
        <div className="current_p">
          <label className="form-label" htmlFor="current_password">
            Current Password
          </label>
          <input
            className="form-control"
            name="current_password"
            id="current_password"
            type={currentPassType ? "text" : "password"}
            placeholder="Enter your current password"
            value={current_password}
            onChange={handleInput}
          />
          <small onClick={() => setCurrentPassType(!currentPassType)}>
            {currentPassType ? <BiShow size={20} /> : <BiHide size={20} />}
          </small>
        </div>

        <div className="updadet_p">
          <label
            className="new_password_label form-label"
            htmlFor="new_password"
          >
            New Password
          </label>
          <input
            className="form-control"
            name="new_password"
            id="new_password"
            type={newpassType ? "text" : "password"}
            placeholder="Enter a password"
            value={new_password}
            onChange={handleInput}
          />
          <small
            className="small_new"
            onClick={() => setNewPassType(!newpassType)}
          >
            {newpassType ? <BiShow size={20} /> : <BiHide size={20} />}
          </small>
          <label className="form-label" htmlFor="conf_password">
            Confirm New Password
          </label>
          <input
            className="form-control"
            name="conf_password"
            id="conf_password"
            type={confPassType ? "text" : "password"}
            placeholder="Enter the password again"
            value={conf_password}
            onChange={handleInput}
          />
          <small
            className="small_conf"
            onClick={() => setConfPassType(!confPassType)}
          >
            {confPassType ? <BiShow size={20} /> : <BiHide size={20} />}
          </small>
          <button type="submit" className="btn btn-dark w-100">
            Update Password
          </button>
        </div>
      </form>
    </>
  );
};

export default UserInfo;
