import { lazy, Suspense } from "react";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { getData } from "../../utils/handleApi";
const LazyCard = lazy(() => import("../../components/Card/Card"));
import Card from "../../components/Card/Card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getPosts } from "../../utils/handleApi";

import "./home.scss";
import { useParams } from "react-router";

export default function Home() {
  const pageId = useParams();
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    const response = await getPosts(pageId.id);
    setPosts(response);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts) {
    return <Loading />;
  }

  return (
    <>
      {/* columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {posts.map((post) => {
            return <LazyCard key={post.id} post={post} />;
          })}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
