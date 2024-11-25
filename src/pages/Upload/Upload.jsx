import { postData } from "../../utils/handleApi";
import { useState } from "react";
import "./upload.scss";

export default function Upload() {
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [sentImage, setSentImage] = useState("");
  const [title, setTitle] = useState("");

  function handleFormData() {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    postData(formData);
  }

  function handleImage(event) {
    event.preventDefault();
    setImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <>
      <h1>Upload images</h1>
      <form className="form">
        <img src={previewImage} alt="" />
        <label htmlFor="file">Image Upload</label>
        <input type="file" name="file" onChange={handleImage} />
        <label htmlFor="" className="form__label">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={handleFormData}>Upload</button>
      </form>
    </>
  );
}
