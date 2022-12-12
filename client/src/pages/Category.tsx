import React, { useState, useEffect } from "react";
import { FormSubmit, ICategories, ICurrentUser } from "../utils/Interfaces";
import loadingGif from "../images/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NotFound from "./NotFound";
import axios from "axios";
import { addToCategories, fetchCategories } from "../redux/categorySlicer";

const Category = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const category = useSelector<ICategories>((store) => store.categories);
  const { categories } = category as ICategories;
  console.log(categories);
  const currentUserBox = useSelector<ICurrentUser>(
    (store) => store.currentUser
  );
  const { currentUser, token } = currentUserBox as ICurrentUser;

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await axios.get("/api/v1/categories/get_all");
      dispatch(fetchCategories(res.data));
    };
    fetchAllCategories();
  }, []);

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();

    if (!token || !name) return;
    try {
      setIsCreated(true);
      const res = await axios.post(
        "/api/v1/categories/create",
        { name },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      dispatch(addToCategories(res.data));
      setName("");
      setIsCreated(false);
    } catch (error: any) {
      setIsCreated(false);
      toast.error(error.response.data.message || error.response.data[0]);
    }
  };
  if (currentUser.role !== "Admin") return <NotFound />;
  return (
    <div className="category row">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <div className="d-flex">
          <input
            type="text"
            name="category"
            id="category"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="create_ctg_btn" type="submit">
            {isCreated ? <img src={loadingGif} /> : "Create"}
          </button>
        </div>
      </form>
      <div>
        {categories.length > 0 &&
          categories.map((c) => (
            <div key={c._id} className="category_row">
              <p className="m-0 text-capitalize">{c.name}</p>
              <div>
                <i className="fas fa-edit mx-2"></i>
                <i className="fas fa-trash-alt "></i>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
