import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import CardVertical from "../components/blog/CardVertical";
import { IBlogs, ICategories, ICurrentUser } from "../utils/Interfaces";
import Snipper from "../components/global/Snipper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/blogSlicer";
import loaderGif from "../images/loading.35b947f5.gif";
import { Interface } from "readline";

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector<IBlogs>((store) => store.blogs);
  const homeBlogs = blogs as IBlogs;
  const categoryBox = useSelector<ICategories>((store) => store.categories);
  const { categories } = categoryBox as ICategories;
  const currentUserBox = useSelector<ICurrentUser>(
    (store) => store.currentUser
  );
  const { currentUser, token } = currentUserBox as ICurrentUser;
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [user, setUser] = useState("");
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
        `/api/v1/blogs/home/get_all?category=${category}&user=${user}&limit=${
          page * 3
        }`
      );
      setTotalBlogCount(res.data.blogCount);
      dispatch(fetchBlogs(res.data.blogs));
      setLoading(false);
    };

    fetchAllHomeBlogs();
  }, [dispatch, page, category]);

  if (homeBlogs.blogs.length === 0) return <Snipper />;
  return (
    <div className="home_page">
      <div className="filetrs-main">
        <div className="filter_content">
          <span>Filter:</span>
          <select
            name="category"
            id=""
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Blogs</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {homeBlogs.blogs.map((blog) => (
        <div className="blog-box" key={blog._id}>
          <h5 className="text-end">
            {/* <Link to={`/blogs/${blog._id}`}>{blog.category.name}</Link> */}

            {/* {blog.category.name.toUpperCase()} */}
          </h5>
          <div className="card-text d-flex baslik">
            <Link to={`/profile/${blog.user?._id}`}>
              <img
                src={blog.user?.avatar}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt=""
              />
            </Link>
            <div className="baslik_user_info">
              <p className="text-capitalize user_info_title">
                {blog.user?.name}
              </p>
              <p className="text-muted user_info_date">
                {moment(blog.createdAt).format("MMMM Do YYYY")}
              </p>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/blogs/${blog._id}`}>
                {blog.title.slice(0, 50) + "..."}
              </Link>
            </h5>
            <p className="card-text">
              {blog.description.slice(0, 100) + "..."}
            </p>
            <Link to={`/blogs/${blog._id}`}>Read More &gt;&gt;</Link>
          </div>
          <div className="home_blogs">
            <div className="card">
              <img
                src={blog.thumbnail}
                className="card-img-top"
                alt="image."
                style={{ height: "200px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      ))}
      {homeBlogs.blogs.length < totalBlogCount && (
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

export default Home;
