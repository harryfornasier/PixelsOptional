import { getCamerasByUsername, postData } from "../../utils/handleApi";
import { useEffect, useState, useRef } from "react";
import bot from "../../assets/icons/bot.png";
import { useNavigate } from "react-router";
import Select from "react-select";
import "./upload.scss";
import { getCompetitionsCurrent } from "../../utils/handleApi";

export default function Upload() {
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState(null);
  const [competitionOptions, setCompetitionOptions] = useState(null);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [portrait, setPortrait] = useState(false);
  const imgEl = useRef(null);

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
      formData.append("camera_id", selectedOption.value);
      formData.append("competition", selectedCompetition.value);
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

  function handlePreviewImg() {
    if (imgEl.current.naturalHeight > imgEl.current.naturalWidth) {
      setPortrait(true);
    }
  }

  async function getCameras() {
    const userId = localStorage.getItem("userId");
    const response = await getCamerasByUsername(userId);
    const cameras = response.data.cameras;
    const cameraArray = [];
    if (cameras.length) {
      cameras.forEach((camera) => {
        cameraArray.push({ value: camera.id, label: camera.model });
      });
      setOptions(cameraArray);
    } else {
      setOptions(null);
    }
  }

  async function getCompetitions() {
    const response = await getCompetitionsCurrent();
    const competitionsArray = [];
    const competitions = response.data.competitions;

    if (competitions.length) {
      competitions.forEach((competition) => {
        competitionsArray.push({
          value: competition.id,
          label: competition.name,
        });
      });
      setCompetitionOptions(competitionsArray);
    }
  }

  useEffect(() => {
    getCameras();
    getCompetitions();
  }, []);

  return (
    <section className="upload">
      <h1>Upload image</h1>
      <div className="upload__container">
        <section
          className={
            !portrait ? "upload__section" : "upload__section upload__section--portrait"
          }
        >
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
          <label className="form__label">Camera:</label>
          <Select
            className="form__select"
            options={options}
            onChange={setSelectedOption}
          />
          <label className="form__label">Competition:</label>
          <Select options={competitionOptions} onChange={setSelectedCompetition} />
          <button className="form__button form__button--desktop" onClick={handleFormData}>
            Upload
          </button>
          {error && (
            <section className="error">
              <img className="icon" src={bot} alt="" />
              <p className="error__message">ValidationBot says: Beeb Boop...{error}</p>
            </section>
          )}
          {!options && <p>You can add cameras you own in your profile page</p>}
        </section>
        <section
          className={
            !portrait
              ? "photo__container-border"
              : "photo__container-border photo__container-border--portrait"
          }
        >
          <div className="photo__container">
            {previewImage && (
              <img
                className="photo__photo"
                src={previewImage}
                ref={imgEl}
                onLoad={handlePreviewImg}
                alt=""
              />
            )}

            <label htmlFor="file" className="form__input-file">
              Add photo (Max 4.5mb)
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
