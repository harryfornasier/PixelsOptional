import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Card from "../../components/Card/Card";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_TEST_URL}/users/profile`, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });

      setUserData(data.user);
      setPosts(data.posts);
      setIsLoading(false);
    } catch (error) {
      if (error.status === 401) {
        setError("You must be logged in to view this page");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <main>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !error && (
        <>
          <section>
            <h1>Welcome</h1>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </section>

          <section>
            <h2>Posts</h2>
            {posts.map((post) => {
              return <Card post={post}></Card>;
            })}
          </section>
        </>
      )}
      {error && <p>{error}</p>}
    </main>
  );
}
