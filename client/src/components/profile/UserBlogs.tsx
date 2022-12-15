import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBlogs, IOtherUser } from "../../utils/Interfaces";

const UserBlogs = () => {
  const otherUserBox = useSelector<IOtherUser>((store) => store.otherUser);
  const { otherUser } = otherUserBox as IOtherUser;
  const homeBlogs = useSelector<IBlogs>((store) => store.blogs);
  const { blogs } = homeBlogs as IBlogs;
  console.log(blogs.length);
  return (
    <div>
      <h2>UserBlogs</h2>
    </div>
  );
};

export default UserBlogs;
