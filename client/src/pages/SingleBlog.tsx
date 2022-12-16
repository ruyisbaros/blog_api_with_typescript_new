import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DisplaySingleBlog from "../components/blog/DisplaySingleBlog";
import Snipper from "../components/global/Snipper";
import { HomeBlog, IBlogs } from "../utils/Interfaces";

const SingleBlog = () => {
  const { id } = useParams();
  const [singleBlog, setSingleBlog] = useState<HomeBlog>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchSingleBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/blogs/get_one/${id}`);
        console.log(res.data);
        setSingleBlog(res.data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        toast.error(error.response.data.message || error.response.data[0]);
      }
    };
    fetchSingleBlog();
    return () => setSingleBlog(undefined);
  }, [id]);
  if (loading) return <Snipper />;
  return (
    <div className="my-4">
      {singleBlog && <DisplaySingleBlog singleBlog={singleBlog} />}
    </div>
  );
};

export default SingleBlog;
