import { postData } from "../../utils/handleApi";
import { useState } from "react";
import "./upload.scss";

export default function Upload() {
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
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
    <section className="upload">
      <h1>Upload image</h1>
      <div className="upload__container">
        <label htmlFor="title" className="form__label">
          Title
        </label>
        <input
          placeholder="Title"
          className="form__input"
          type="text"
          name="title"
          id="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <section className="photo__container-border">
          <div className="photo__container">
            <img src={previewImage} alt="" />
            <label htmlFor="file" className="form__input-file">
              Add photo
            </label>
            <input
              className="form__file"
              type="file"
              id="file"
              name="file"
              onChange={handleImage}
            />
          </div>
        </section>
        <button className="form__button" onClick={handleFormData}>
          Upload
        </button>
      </div>
    </section>
  );
}
