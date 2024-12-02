import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
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
      <h1>{`User: ${userData.user}`}</h1>{" "}
      <section>
        <h2>User Posts</h2>
        {userData.posts.map((post) => {
          return <Card key={post.id} post={post} />;
        })}
      </section>
    </>
  );
}
