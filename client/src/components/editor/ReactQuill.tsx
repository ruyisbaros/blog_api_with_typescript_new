import React, { useEffect, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { checkImage, uploadImage } from "../../utils/ImageUpload";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadingFinish, loadingStart } from "../../redux/loadSlicer";

interface IProps {
  setBody: (value: string) => void;
}

const Quill: React.FC<IProps> = ({ setBody }) => {
  const quillRef = useRef<ReactQuill>(null);
  const dispatch = useDispatch();

  const modules = { toolbar: { container } };

  //Custom Image
  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = async () => {
      const files = input.files;

      if (!files) return;
      const file = files[0];
      const check = checkImage(file);
      if (check) return toast.error(check);
      dispatch(loadingStart());
      const photo = await uploadImage(file);
      console.log(photo);
      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, "image", `${photo.url}`);
      }
      dispatch(loadingFinish());
    };
  }, [dispatch]);
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);
  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        onChange={(e) => setBody(e)}
        ref={quillRef}
      />
    </div>
  );
};

let container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean", "link", "image", "video"],
];

export default Quill;
