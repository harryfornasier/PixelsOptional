import { postData } from "../../utils/handleApi";
import { useState } from "react";

export default function Upload() {
  const [image, setImage] = useState("");
  const [sentImage, setSentImage] = useState("");
  const [title, setTitle] = useState("");

  function handleFormData() {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    console.log(formData);
    postData(formData);
  }

  function handleImage(event) {
    event.preventDefault();
    setImage(event.target.files[0]);
  }

  return (
    <>
      <img src={sentImage} key={sentImage} alt="" />
      <h1>Upload images</h1>

      <input type="file" name="file" onChange={handleImage} />
      <input
        type="text"
        name="title"
        id="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button onClick={handleFormData}>Submit</button>
    </>
  );
}
