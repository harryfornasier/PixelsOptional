import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";

export default function Login({ setLoggedIn }) {
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("You must provide a username and password");
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("userId", data.id);
      localStorage.setItem("authToken", data.authToken);

      if (data.admin > 0) {
        localStorage.setItem("admin", data.admin);
      }

      navigate("/profile");
      setLoggedIn(true);
      setSuccess(true);
    } catch (error) {
      if (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="form__input"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form__input"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit" className="form__button">
          Login
        </button>
        {errorMessage && <p>{errorMessage}</p>}
        {success && <p>Success! You can now access the profile page.</p>}
      </form>
    </>
  );
}
