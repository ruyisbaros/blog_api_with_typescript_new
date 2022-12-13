import React, { useState, useRef, useEffect } from "react";
import loadingGif from "../images/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { ICurrentUser, IBlog } from "../utils/Interfaces";
import CreateForm from "../components/blog/CreateForm";
import CardHorizontal from "../components/blog/CardHorizontal";
import ReactQuill from "../components/editor/ReactQuill";
import { validCreateBlog } from "../utils/Valid";
import { uploadImage } from "../utils/ImageUpload";
import { loadingFinish, loadingStart } from "../redux/loadSlicer";
import { addToBlogs } from "../redux/blogSlicer";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const currentUserBox = useSelector<ICurrentUser>(
    (store) => store.currentUser
  );
  const { currentUser, token } = currentUserBox as ICurrentUser;
  const [blog, setBlog] = useState<IBlog>({
    user: currentUser._id,
    title: "",
    description: "",
    content: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  });
  const [body, setBody] = useState("");
  const [text, setText] = useState("");
  //console.log(body);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = bodyRef.current;
    const content = div?.innerText as string;
    setBlog({ ...blog, content });
    setText(content);
  }, [body]);

  const handleSubmit = async () => {
    if (!token) return;
    let url = "";
    const check = validCreateBlog({
      ...blog,
    });
    if (check) return toast.error(check);
    try {
      dispatch(loadingStart());
      if (typeof blog.thumbnail !== "string") {
        const photo = await uploadImage(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }
      //console.log(url);
      setBlog({ ...blog, thumbnail: url });

      const res = await axios.post(
        "/api/v1/blogs/create",
        { ...blog },
        {
          headers: { Authorization: token },
        }
      );
      console.log(res);
      dispatch(addToBlogs(res.data));
      dispatch(loadingFinish());
      toast.success("Blog created successfully");
    } catch (error: any) {
      dispatch(loadingFinish());
      toast.error(error.response.data.message || error.response.data[0]);
    }
  };
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

      <div
        ref={bodyRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />
      <small>{text.length}</small>
      <button
        onClick={handleSubmit}
        className="btn btn-dark my-3 d-block mx-auto"
      >
        Create Post
      </button>
    </div>
  );
};

export default CreateBlog;
