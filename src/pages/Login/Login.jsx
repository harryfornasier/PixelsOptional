import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setLoggedIn }) {
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button>Login</button>
        {errorMessage && <p>{errorMessage}</p>}
        {success && <p>Success! You can now access the profile page.</p>}
      </form>
    </>
  );
}
