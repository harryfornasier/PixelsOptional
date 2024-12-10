import { lazy, Suspense } from "react";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
const LazyCard = lazy(() => import("../../components/Card/Card"));
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getPosts } from "../../utils/handleApi";
import Pagination from "../../components/Pagination/Pagination";
import "./home.scss";
import { useSearchParams } from "react-router";
import Select from "react-select";
import { getCompetitionsCurrent } from "../../utils/handleApi";

export default function Home() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [competitionOptions, setCompetitionOptions] = useState(null);
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  const fetchPosts = async () => {
    setSearchParams({
      page: page,
      filter: selectedCompetition ? selectedCompetition.label : "none",
    });
    const response = await getPosts(searchParams.get("page"), selectedCompetition);
    setPosts(response);
  };

  async function getCompetitions() {
    const response = await getCompetitionsCurrent();
    const competitionsArray = [];
    const competitions = response.data.competitions;

    if (competitions.length) {
      competitions.forEach((competition) => {
        competitionsArray.push({
          value: competition.id,
          label: competition.name,
        });
      });
      setCompetitionOptions(competitionsArray);
    }
  }

  useEffect(() => {
    fetchPosts();
    getCompetitions();
  }, [searchParams, selectedCompetition]);

  if (!posts) {
    return <Loading />;
  }

  return (
    <>
      <section className="home__details">
        <Pagination
          page={page}
          setSearchParams={setSearchParams}
          setPage={setPage}
          fetchPosts={fetchPosts}
          searchParams={searchParams}
        />
        <Select options={competitionOptions} onChange={setSelectedCompetition}></Select>
      </section>
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
