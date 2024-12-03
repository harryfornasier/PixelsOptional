import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";

export default function Profile({ setLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
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
    setLoggedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("admin");
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
            <p>Like Pot: {userData.pot}</p>
            <p>Recieved Likes: {userData.likes}</p>
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
