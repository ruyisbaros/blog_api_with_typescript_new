import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import CardVertical from "../components/blog/CardVertical";
import { IBlogs, ICurrentUser } from "../utils/Interfaces";

const Home = () => {
  //const dispatch = useDispatch();
  const blogs = useSelector<IBlogs>((store) => store.blogs);
  const homeBlogs = blogs as IBlogs;
  console.log(blogs);
  //console.log(typeof homeBlogs);
  const currentUserBox = useSelector<ICurrentUser>(
    (store) => store.currentUser
  );
  const { currentUser, token } = currentUserBox as ICurrentUser;

  return (
    <div className="home_page">
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
          <hr className="mt-1" />
        </div>
      ))}
    </div>
  );
};

export default Home;
