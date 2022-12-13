import React, { useState } from "react";
import loadingGif from "../images/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { ICurrentUser, IBlog } from "../utils/Interfaces";
import CreateForm from "../components/blog/CreateForm";
import CardHorizontal from "../components/blog/CardHorizontal";
import ReactQuill from "../components/editor/ReactQuill";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const currentUserBox = useSelector<ICurrentUser>(
    (store) => store.currentUser
  );
  const { currentUser, token } = currentUserBox as ICurrentUser;
  const [blog, setBlog] = useState<IBlog>({
    user: "",
    title: "",
    description: "",
    content: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  });
  const [body, setBody] = useState("");
  //console.log(body);
  return (
    <div className="create_blog my-4">
      {/* <h2>Create Blog</h2> */}
      <div className="row mt-4 ">
        <div className="col-md-6">
          <h5>Create</h5>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>
        <div className="col-md-6">
          <h5>Preview</h5>
          <CardHorizontal blog={blog} />
        </div>
      </div>
      <ReactQuill setBody={setBody} />
      <button className="btn btn-dark my-3 d-block mx-auto">Create Post</button>
    </div>
  );
};

export default CreateBlog;
