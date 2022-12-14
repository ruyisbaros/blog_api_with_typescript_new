import React from "react";
import { Link } from "react-router-dom";
import { HomeBlog, IBlog } from "../../utils/Interfaces";

interface Props {
  blog: HomeBlog;
}
const CardVertical: React.FC<Props> = ({ blog }) => {
  return (
    <div className="card">
      <img
        src={blog.thumbnail}
        className="card-img-top"
        alt="image."
        style={{ height: "200px", objectFit: "cover" }}
      />
    </div>
  );
};

export default CardVertical;
