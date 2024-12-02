import { lazy, Suspense } from "react";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { getData } from "../../utils/handleApi";
// const LazyCard = lazy(() => import("../../components/Card/Card"));
import Card from "../../components/Card/Card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getPosts } from "../../utils/handleApi";

import "./home.scss";
import { useParams } from "react-router";

export default function Home() {
  const pageId = useParams();

  // A state variable
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    const response = await getPosts(pageId.id);
    console.log(response);

    // Idea: Get 21
    // put img from grp 1 in a colum
    // put img from grp 2 in a different column
    // Etc...
    // Solves: This distributes the images across columns

    //Need to push posts to each "setPost" evenly
    for (let i = 0; i < response.length; i++) {
      for (let i = 0; i < 3; i++) {}
    }

    // setPosts({
    //   response1: response.slice(0, 6),
    //   response2: response.slice(7, 13),
    //   response3: response.slice(14, 20),
    // });

    setPosts(response);
    // Probem: This works for 21 items
    // If we have 2 items for example, it puts all in res1 -> squashed

    // Question: How can we tell the library a max number of items in a column

    // Solutions:
    // 1) If post count is less than 3, do columnsCount={1}
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {/* columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {posts.map((post) => {
            return <Card key={post.id} post={post} />;
          })}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
