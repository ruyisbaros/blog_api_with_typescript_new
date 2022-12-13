import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import {
  ICategories,
  IBlog,
  FormSubmit,
  InputChange,
} from "../../utils/Interfaces";

interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const category = useSelector<ICategories>((store) => store.categories);
  const { categories } = category as ICategories;

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target;

    setBlog({ ...blog, [name]: value });
  };

  const handleChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      //console.log(file);
      setBlog({ ...blog, thumbnail: file });
    } else {
      alert("Please select an image");
    }
  };

  return (
    <form>
      <div className="form-group position-relative">
        {/*  <label htmlFor="title">Title</label> */}
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Title"
          value={blog.title}
          name="title"
          onChange={handleChange}
        />
        <small
          style={{ bottom: 0, right: "3px", opacity: "0.5" }}
          className="text-muted position-absolute"
        >
          {blog.title.length}/50
        </small>
      </div>
      <div className="form-group my-3">
        {/*  <label htmlFor="title">Title</label> */}
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleChangeThumbnail}
        />
      </div>
      <div className="form-group position-relative">
        {/*  <label htmlFor="title">Title</label> */}
        <textarea
          className="form-control"
          name="description"
          placeholder="description"
          value={blog.description}
          onChange={handleChange}
        />
        <small
          style={{ bottom: 0, right: "3px", opacity: "0.5" }}
          className="text-muted position-absolute"
        >
          {blog.description.length}/200
        </small>
      </div>
      <div className="form-group my-3">
        <select
          className="form-control text-capitalize"
          name="category"
          value={blog.category}
          onChange={handleChange}
        >
          <option value="">Choose a Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CreateForm;
