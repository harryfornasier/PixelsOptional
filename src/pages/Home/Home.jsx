import { useEffect, useState } from "react";
import { getData } from "../../utils/handleApi";
import Card from "../../components/Card/Card";

export default function Home() {
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    const response = await getData("/posts");
    setPosts(response);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {posts.map((post) => {
        return <Card key={post.id} post={post} />;
      })}
    </>
  );
}
