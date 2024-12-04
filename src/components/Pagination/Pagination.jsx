export default function Pagination({
  page,
  maxPage,
  setPage,
  fetchPosts,
  setSearchParams,
  searchParams,
}) {
  function handlePrevious() {
    setPage(page - 1);
    setSearchParams({ page: page - 1 });
  }

  function handleNext() {
    setPage(page + 1);
    setSearchParams({ page: page + 1 });
  }

  return (
    <section className="pagination">
      <button
        onClick={handlePrevious}
        className="previous"
        disabled={searchParams.get("page") <= 1}
      >
        Previous
      </button>
      <p>{searchParams.get("page")}</p>
      <button onClick={handleNext} className="next">
        Next
      </button>
    </section>
  );
}
