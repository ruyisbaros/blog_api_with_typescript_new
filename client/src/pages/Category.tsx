import React, { useState, useEffect } from "react";
import {
  FormSubmit,
  ICategories,
  ICurrentUser,
  ICategory,
} from "../utils/Interfaces";
import loadingGif from "../images/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NotFound from "./NotFound";
import axios from "axios";
import {
  addToCategories,
  removeFromCategories,
  updateCategory,
} from "../redux/categorySlicer";

const Category = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [edit, setEdit] = useState<ICategory | null>(null);
  const [isCreated, setIsCreated] = useState(false);
  const category = useSelector<ICategories>((store) => store.categories);
  const { categories } = category as ICategories;
  //console.log(categories);
  const currentUserBox = useSelector<ICurrentUser>(
    (store) => store.currentUser
  );
  const { currentUser, token } = currentUserBox as ICurrentUser;

  useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();

    if (!token || !name) return;
    if (edit) {
      if (edit.name === name) return;
      try {
        setIsCreated(true);
        const res = await axios.patch(
          `/api/v1/categories/update/${edit._id}`,
          { name },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        //console.log(res);
        dispatch(
          updateCategory({ id: edit._id, category: res.data.updatedCategory })
        );
        setName("");
        toast.success(res.data.message);
        setIsCreated(false);
      } catch (error: any) {
        setIsCreated(false);
        toast.error(error.response.data.message || error.response.data[0]);
      }
    } else {
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
    }
  };
  const deleteCategory = async (id: string) => {
    if (!token) return;
    try {
      const res = await axios.delete(`/api/v1/categories/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      toast.success(res.data.message);
      dispatch(removeFromCategories(id));
    } catch (error: any) {
      toast.error(error.response.data.message || error.response.data[0]);
    }
  };

  if (currentUser.role !== "Admin") return <NotFound />;
  return (
    <div className="category row">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <div className="d-flex align-items-center">
          {edit && (
            <i
              onClick={() => setEdit(null)}
              className="fas fa-times me-2 text-danger"
              style={{ cursor: "pointer" }}
            ></i>
          )}
          <input
            type="text"
            name="category"
            id="category"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="create_ctg_btn" type="submit">
            {isCreated ? <img src={loadingGif} /> : edit ? "Update" : "Create"}
          </button>
        </div>
      </form>
      <div>
        {categories.length > 0 &&
          categories.map((c) => (
            <div key={c._id} className="category_row">
              <p className="m-0 text-capitalize">{c.name}</p>
              <div>
                <i onClick={() => setEdit(c)} className="fas fa-edit mx-2"></i>
                <i
                  onClick={() => deleteCategory(c._id)}
                  className="fas fa-trash-alt "
                ></i>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
