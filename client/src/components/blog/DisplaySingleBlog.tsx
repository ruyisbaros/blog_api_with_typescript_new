import moment from "moment";
import React from "react";
import { HomeBlog, IBlogs } from "../../utils/Interfaces";
import Input from "../comments/input";
import Comments from "../comments/Comments";

interface Props {
  singleBlog: HomeBlog;
}

const DisplaySingleBlog: React.FC<Props> = ({ singleBlog }) => {
  return (
    <div>
      <h2
        className="text-center text-capitalize my-3 fs-1"
        style={{ color: "#ff7a00" }}
      >
        {singleBlog.title}
      </h2>
      <div className="text-end fw-bold mb-4" style={{ color: "teal" }}>
        <small>By: {singleBlog.user?.name}</small>
        <small className="ms-2">
          {moment(singleBlog.createdAt).format("MMM Do YY")}
        </small>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: singleBlog.content,
        }}
      />
      <hr className="my-4" />
      <h3 style={{ color: "#ff7a00" }}>&#9734; Comments &#9734;</h3>
      <Input />
    </div>
  );
};

export default DisplaySingleBlog;
