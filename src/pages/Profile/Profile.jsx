import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Select from "react-select";
import { components } from "react-select";
import "./profile.scss";
import { changeIcon } from "../../utils/handleApi";
import options from "../../assets/iconOptions";

export default function Profile({ setLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  const { Option } = components;
  const IconOption = (props) => {
    const { data } = props;
    return (
      <Option {...props}>
        <img src={data.icon} style={{ width: 36 }} alt={data.label} />
        {data.label}
      </Option>
    );
  };

  async function handleIcon() {
    const response = await changeIcon(selectedOption);
    console.log(response);
  }

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

      for (let i = 0; i < options.length; i++) {
        if (options[i].icon === data.user.icon_url) {
          setSelectedOption(options[i]);
        }
      }
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
            {selectedOption && <img src={selectedOption.icon} alt="" />}

            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Like Pot: {userData.pot}</p>
            <p>Recieved Likes: {userData.likes}</p>
            <section className="select__container">
              <Select
                onChange={setSelectedOption}
                defaultValue={selectedOption}
                options={options}
                components={{ Option: IconOption }}
              />
              <button onClick={handleIcon} className="select__submit">
                Submit
              </button>
            </section>

            <button onClick={handleLogout}>Logout</button>
          </section>

          <section>
            <h2>Posts</h2>

            <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 750: 2, 900: 3 }}>
              <Masonry>
                {posts.map((post) => {
                  return <Card post={post}></Card>;
                })}
              </Masonry>
            </ResponsiveMasonry>
          </section>
        </>
      )}
      {error && <p>{error}</p>}
    </main>
  );
}
