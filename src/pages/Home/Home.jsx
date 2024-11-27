import { lazy, Suspense } from "react";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { getData } from "../../utils/handleApi";
import Card from "../../components/Card/Card";
const LazyCard = lazy(() => import("../../components/Card/Card"));

import "./home.scss";

export default function Home() {
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    const response = await getData("/posts");
    setPosts(response);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <main className="main">
        {posts && (
          <Suspense fallback={<Loading />}>
            {posts.map((post) => {
              return <LazyCard key={post.id} post={post} />;
            })}
          </Suspense>
        )}
      </main>
    </>
  );
}
