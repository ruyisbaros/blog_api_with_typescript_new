import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBlogs, ICurrentUser, IOtherUser } from "../../utils/Interfaces";
import CardHorizontal from "../blog/CardHorizontal";
import { toast } from "react-toastify";
import { loadingFinish, loadingStart } from "../../redux/loadSlicer";
import axios from "axios";
import { fetchBlogs } from "../../redux/blogSlicer";
interface Props {
  id: string;
}
const UserBlogs: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const otherUserBox = useSelector<IOtherUser>((store) => store.otherUser);
  const { otherUser } = otherUserBox as IOtherUser;
  const currentUser = useSelector<ICurrentUser>((store) => store.currentUser);
  const userObj = currentUser as ICurrentUser;
  const homeBlogs = useSelector<IBlogs>((store) => store.blogs);
  const { blogs } = homeBlogs as IBlogs;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalBlogCount, setTotalBlogCount] = useState(0);
  const handleScroll = () => {
    setLoading(true);
    setTimeout(() => {
      setPage((prev) => prev + 1);
      window.scrollTo(0, document.body.scrollHeight);
    }, 1000);
  };
  useEffect(() => {
    const fetchAllHomeBlogs = async () => {
      const res = await axios.get(
        `/api/v1/blogs/get_all?user=${id}&limit=${page * 3}`
      );
      setTotalBlogCount(res.data.blogCount);
      dispatch(fetchBlogs(res.data.blogs));
      setLoading(false);
    };

    fetchAllHomeBlogs();
  }, [dispatch, page, id]);

  if (blogs.length === 0)
    return (
      <h3 className="text-center my-3">
        {userObj.currentUser._id === id
          ? "You have No Post Yet!"
          : "This User has no blog yet!"}
      </h3>
    );
  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <CardHorizontal key={blog._id} blog={blog} />
        ))}
      </div>
      {blogs.length < totalBlogCount && (
        <div
          onClick={handleScroll}
          className={loading ? "load_more_icon loading" : "load_more_icon"}
        >
          {!loading && <i className="fa-solid fa-download"></i>}
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
