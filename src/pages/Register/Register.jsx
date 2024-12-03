import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // When any input changes, update the correct field in state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.name) {
      setErrorMessage("You must fill in all the form fields");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      setErrorMessage("");
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.msg);
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form__group">
          <label htmlFor="emailRegister">Email</label>
          <input
            type="email"
            name="email"
            id="emailRegister"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="passwordRegister">Password</label>
          <input
            type="password"
            name="password"
            id="passwordRegister"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button>Signup</button>
        {errorMessage && <p>{errorMessage}</p>}
        {success && <p>Success! Please login.</p>}
      </form>
    </>
  );
}
