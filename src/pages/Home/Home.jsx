import { lazy, Suspense } from "react";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
const LazyCard = lazy(() => import("../../components/Card/Card"));
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getPosts } from "../../utils/handleApi";
import Pagination from "../../components/Pagination/Pagination";
import "./home.scss";
import { useSearchParams } from "react-router";

export default function Home() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchPosts = async () => {
    const response = await getPosts(searchParams.get("page"));
    setPosts(response);
  };

  useEffect(() => {
    fetchPosts();
  }, [searchParams]);

  if (!posts) {
    return <Loading />;
  }

  return (
    <>
      <Pagination
        page={page}
        setSearchParams={setSearchParams}
        setPage={setPage}
        fetchPosts={fetchPosts}
        searchParams={searchParams}
      />
      <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {posts.map((post) => {
            return <LazyCard key={post.id} post={post} fetchPosts={fetchPosts} />;
          })}
        </Masonry>
      </ResponsiveMasonry>
      <Pagination
        page={page}
        setSearchParams={setSearchParams}
        setPage={setPage}
        fetchPosts={fetchPosts}
        searchParams={searchParams}
      />
    </>
  );
}
