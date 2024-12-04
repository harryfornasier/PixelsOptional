import "./pagination.scss";

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
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  function handleNext() {
    setPage(page + 1);
    setSearchParams({ page: page + 1 });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  return (
    <section className="pagination">
      <div className="pagination__container">
        <button
          onClick={handlePrevious}
          className="pagination__button"
          disabled={searchParams.get("page") <= 1}
        >
          Previous
        </button>

        <button onClick={handleNext} className="pagination__button">
          Next
        </button>
      </div>
    </section>
  );
}
