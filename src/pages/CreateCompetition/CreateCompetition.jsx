import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

export default function CreateCompetition() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    name: "",
  });

  const getUserData = async () => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });
      setIsLoading(false);
    } catch (error) {
      if (error.status === 401) {
        setError("You must be logged in to view this page");
        setIsLoading(false);
      }
      if (error.status === 403) {
        setError("You are not authorised to view this page");
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    if (!formData.description || !formData.name) {
      setErrorMessage("You must fill in all the form fields");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/competitions`,
        formData,
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );

      setErrorMessage("");
      setSuccess(true);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <main>
      {isLoading && <Loading />}
      {!isLoading && !error && (
        <>
          <form className="form" onSubmit={handleSubmit}>
            <h2>Create Competition</h2>
            <div className="form__group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="form__input"
                id="name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form__input"
                type="text"
                name="description"
                id="description"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <button className="form__button">Submit</button>
            {errorMessage && <p>{errorMessage}</p>}
            {success && <p>Success! Please login.</p>}
          </form>
        </>
      )}
      {error && <p>{error}</p>}
    </main>
  );
}
