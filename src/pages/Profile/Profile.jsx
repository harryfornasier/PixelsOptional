import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Select, { components } from "react-select";
import busted from "../../assets/icons/Error/busted.png";
import sunk from "../../assets/icons/Error/sunk.png";

export default function Profile({ setLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const options = [
    { value: "Sunk", label: "Sunk", icon: "sunk.png" },
    { value: "Busted", label: "Busted", icon: "busted.png" },
  ];

  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props}>
      <img src={`./${props.data.icon}`} style={{ width: 36 }} alt={props.data.label} />
      {props.data.label}
    </Option>
  );

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
    localStorage.removeItem("authToken");
    setLoggedIn(false);
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
            <Select
              defaultValue={options[0]}
              options={options}
              components={{ Option: IconOption }}
            />
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
