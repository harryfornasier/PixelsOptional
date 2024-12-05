import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "../components/Pagination/Pagination.jsx";
import "@testing-library/jest-dom";

// Mock the props
const mockSetPage = vi.fn();
const mockSetSearchParams = vi.fn();
const mockFetchPosts = vi.fn();
const mockSearchParams = new URLSearchParams();

describe("Pagination Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockSetPage.mockClear();
    mockSetSearchParams.mockClear();
  });

  it("renders Pagination buttons", () => {
    render(
      <Pagination
        page={1}
        maxPage={5}
        setPage={mockSetPage}
        fetchPosts={mockFetchPosts}
        setSearchParams={mockSetSearchParams}
        searchParams={mockSearchParams}
      />
    );

    // Check if the buttons are rendered
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls handlePrevious when clicking 'Previous' button", () => {
    render(
      <Pagination
        page={2}
        maxPage={5}
        setPage={mockSetPage}
        fetchPosts={mockFetchPosts}
        setSearchParams={mockSetSearchParams}
        searchParams={mockSearchParams}
      />
    );

    const previousButton = screen.getByText("Previous");

    // Fire a click event on the Previous button
    fireEvent.click(previousButton);

    // Check if setPage and setSearchParams were called with the correct arguments
    expect(mockSetPage).toHaveBeenCalledWith(1);
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: 1 });
    expect(document.body.scrollTop).toBe(0);
    expect(document.documentElement.scrollTop).toBe(0);
  });

  it("calls handleNext when clicking 'Next' button", () => {
    render(
      <Pagination
        page={2}
        maxPage={5}
        setPage={mockSetPage}
        fetchPosts={mockFetchPosts}
        setSearchParams={mockSetSearchParams}
        searchParams={mockSearchParams}
      />
    );

    const nextButton = screen.getByText("Next");

    // Fire a click event on the Next button
    fireEvent.click(nextButton);

    // Check if setPage and setSearchParams were called with the correct arguments
    expect(mockSetPage).toHaveBeenCalledWith(3);
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: 3 });
    expect(document.body.scrollTop).toBe(0);
    expect(document.documentElement.scrollTop).toBe(0);
  });

  it('disables "Previous" button when on first page', () => {
    render(
      <Pagination
        page={1}
        maxPage={5}
        setPage={mockSetPage}
        fetchPosts={mockFetchPosts}
        setSearchParams={mockSetSearchParams}
        searchParams={mockSearchParams}
      />
    );

    const previousButton = screen.getByText("Previous");

    // Ensure the 'Previous' button is disabled on the first page
    expect(previousButton).toBeDisabled();
  });

  it('does not disable "Next" button when not on last page', () => {
    render(
      <Pagination
        page={2}
        maxPage={5}
        setPage={mockSetPage}
        fetchPosts={mockFetchPosts}
        setSearchParams={mockSetSearchParams}
        searchParams={mockSearchParams}
      />
    );

    const nextButton = screen.getByText("Next");

    // Ensure the 'Next' button is not disabled
    expect(nextButton).not.toBeDisabled();
  });

  it('disables "Next" button when on the last page', () => {
    render(
      <Pagination
        page={5}
        maxPage={5}
        setPage={mockSetPage}
        fetchPosts={mockFetchPosts}
        setSearchParams={mockSetSearchParams}
        searchParams={mockSearchParams}
      />
    );

    const nextButton = screen.getByText("Next");

    // Ensure the 'Next' button is disabled on the last page
    expect(nextButton).toBeDisabled();
  });
});
