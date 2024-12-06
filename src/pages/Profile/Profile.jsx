import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Select from "react-select";
import { components } from "react-select";
import "./profile.scss";
import { changeIcon, getCamerasByUsername, postCamera } from "../../utils/handleApi";
import options from "../../assets/iconOptions";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading/Loading.jsx";

export default function Profile({ setLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [userCameras, setUserCameras] = useState(null);
  const [camera, setCamera] = useState({
    cameraBrand: "",
    cameraYear: 1,
    cameraModel: "",
  });

  const navigate = useNavigate();

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
  }

  const getUserData = async () => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });

      const response = await getCamerasByUsername(userId);
      setUserData(data.user);
      setPosts(data.posts);
      setUserCameras(response.data.cameras);

      console.log(data);

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

  async function handleCameraApi(event) {
    event.preventDefault();
    const newCamera = await postCamera(camera);
    getUserData();
  }

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <main>
      {isLoading && <Loading />}
      {!isLoading && !error && (
        <>
          <section className="profile">
            <section className="profile__information">
              <h1 className="profile__header">
                Welcome {userData.name}
                <div class="card__icon-container">
                  {selectedOption && <img src={selectedOption.icon} alt="" />}
                </div>
              </h1>
              <p>Email: {userData.email}</p>

              <p>Like Pot: {userData.pot}</p>
              <p>Recieved Likes: {userData.likes}</p>

              <button onClick={handleLogout}>Logout</button>
            </section>

            <section className="camera">
              <form className="camera__form" action="submit">
                <label className="form__label" htmlFor="brand">
                  Brand
                </label>
                <input
                  onChange={(e) => {
                    setCamera({
                      cameraBrand: e.target.value,
                      cameraYear: camera.cameraYear,
                      cameraModel: camera.cameraBrand,
                    });
                  }}
                  className="form__input"
                  type="text"
                  htmlFor="brand"
                  id="brand"
                />
                <label className="form__label" htmlFor="model">
                  Model
                </label>
                <input
                  type="text"
                  className="form__input"
                  onChange={(e) => {
                    setCamera({
                      cameraBrand: camera.cameraBrand,
                      cameraYear: camera.cameraYear,
                      cameraModel: e.target.value,
                    });
                  }}
                />
                <label htmlFor="year" className="form__label">
                  Year
                </label>
                <input
                  type="number"
                  maxLength={4}
                  className="form__input"
                  onChange={(e) => {
                    setCamera({
                      cameraBrand: camera.cameraBrand,
                      cameraYear: e.target.value,
                      cameraModel: camera.cameraModel,
                    });
                  }}
                />
              </form>
              <button className="form__button" onClick={handleCameraApi}>
                Submit
              </button>
            </section>

            <section className="profile__edit">
              <section className="select__container">
                <label htmlFor="select">User Icon:</label>
                <Select
                  id="select"
                  onChange={setSelectedOption}
                  defaultValue={selectedOption}
                  options={options}
                  components={{ Option: IconOption }}
                />
                <button onClick={handleIcon} className="select__submit">
                  Submit
                </button>
              </section>
            </section>

            {userCameras && (
              <section className="cameras">
                {userCameras.map((camera) => {
                  return (
                    <div className="cameras__divider">
                      <p>{camera.brand}</p>
                      <p>{camera.model}</p>
                      <p>{camera.year}</p>
                    </div>
                  );
                })}
              </section>
            )}
          </section>

          <section>
            <h2>Posts</h2>

            <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 750: 2, 900: 3 }}>
              <Masonry>
                {posts.map((post) => {
                  return <Card userView={true} post={post}></Card>;
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
