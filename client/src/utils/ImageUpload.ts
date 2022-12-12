import axios from "axios";

export const checkImage = (file: File) => {
  let err = ""
  if (!file) return err = "File not found"
  if (file.size > 1024 * 1024 * 1) return err = "Your file is too large (max 1mb allowed)"
  if (file.type !== "image/jpeg" && file.type !== "image/png") return err = "Only jpeg, jpg or PNG images are allowed"

  return err
}
export const uploadImage = async (file: File) => {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "p7ilxyb7");
  formData.append("cloud_name", "ruyisbaros");

  const res = await fetch("https://api.cloudinary.com/v1_1/ruyisbaros/upload", {
    method: "POST",
    body: formData,
  })
  const data = await res.json();

  return { public_id: data.public_id, url: data.secure_url };

}