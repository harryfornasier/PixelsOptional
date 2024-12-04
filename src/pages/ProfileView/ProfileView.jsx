import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
export default function ProfileView() {
  const userId = useParams();
  const [userData, setUserData] = useState();

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile/${userId.id}`
      );
      setUserData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!userData) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="profile__header">
        {userData.user.name}
        <div class="card__icon-container">
          <img src={userData.user.icon_url} alt="" />
        </div>
      </h1>
      <h2>Likes: {userData.user.likes}</h2>
      <section>
        <h2>User Posts</h2>
        <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {userData.posts.map((post) => {
              return <Card userView={true} key={post.id} post={post} />;
            })}
          </Masonry>
        </ResponsiveMasonry>
      </section>
    </>
  );
}
