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
      <main className="main">
        {" "}
        <h1>Upload images</h1>
        <section className="photo__container-border">
          <div className="photo__container">
            <img src={previewImage} alt="" />
          </div>
        </section>
        <form className="form">
          <label htmlFor="file" className="form__input-file">
            Image Upload
          </label>
          <input
            className="form__file"
            type="file"
            id="file"
            name="file"
            onChange={handleImage}
          />
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
          <button onClick={handleFormData}>Upload</button>
        </form>
      </main>
    </>
  );
}
