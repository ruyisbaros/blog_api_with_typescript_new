import { IBlog } from "./Interfaces";

export function validCreateBlog({ title, description, category, content, thumbnail }: IBlog) {
    let err: string = ""
    if (!title) err = "Title is required";
    else if (title.trim().length > 50) err = "Title is too long";

    if (!description) err = "Description is required";
    else if (description.trim().length > 200) err = "Description is too long";

    if (!category) err = "Category is required";


    /* if (!content) err = "Content is required"; */
    if (content.trim().length > 2000) err = "Content is too long";
    if (!thumbnail) err = "Blog Image is required";

    return err;

}