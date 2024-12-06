import { postData } from "../../utils/handleApi";
import { useState } from "react";
import bot from "../../assets/icons/bot.png";
import { useNavigate } from "react-router";
import "./upload.scss";

export default function Upload() {
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleFormData() {
    const formData = new FormData();
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setError("You are not logged in");
    } else if (!title) {
      setError("You didn't add a title");
    } else if (!image) {
      setError("You didn't add an image");
    } else {
      formData.append("image", image);
      formData.append("title", title);
      const response = await postData(formData);
      setTitle("");

      navigate(`/post/${response}`);

      if (response.status === 413) {
        setError(
          "File too large. Not sure how you did that it's set to max 4.5mb on the front-end 🤨."
        );
      }
    }
  }

  function handleImage(event) {
    event.preventDefault();
    if (event.target.files[0].size > 4.5 * 1000 * 1024) {
      setError("File is too big");
    } else {
      setImage(event.target.files[0]);
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <section className="upload">
      <h1>Upload image</h1>
      <div className="upload__container">
        <section className="upload__section">
          <label htmlFor="title" className="form__label">
            Title
          </label>
          <input
            placeholder="Title"
            className="form__input"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />
          <button className="form__button form__button--desktop" onClick={handleFormData}>
            Upload
          </button>
          {error && (
            <section className="error">
              <img className="icon" src={bot} alt="" />
              <p className="error__message">ValidationBot says: Beeb Boop...{error}</p>
            </section>
          )}
        </section>
        <section className="photo__container-border">
          <div className="photo__container">
            {previewImage && <img className="photo__photo" src={previewImage} alt="" />}

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
        <button className="form__button form__button--mobile" onClick={handleFormData}>
          Upload
        </button>
      </div>
    </section>
  );
}
