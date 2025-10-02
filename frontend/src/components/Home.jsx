import WelcomeBanner from "./WelcomeBanner";
import FilterSidebar from "./FilterSideBar";
import BranchSpotlight from "./BranchSpotLight";
import BookListings from "./BookListings";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function Home() {
  const { books, branches, years } = useLoaderData();

  const [searchValue, setSearchValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);

  // Runtime search filtering
  const handleSearch = (value) => {
    setSearchValue(value);
    const lowerValue = value.toLowerCase();

    const result = books.filter((book) => {
      const bookName = book.name?.toLowerCase() || "";
      const branchName =
        typeof book.branch === "object"
          ? book.branch.name.toLowerCase()
          : (book.branch || "").toLowerCase();
      const yearName =
        typeof book.year === "object"
          ? book.year.name.toLowerCase()
          : (book.year || "").toLowerCase();

      return (
        bookName.includes(lowerValue) ||
        branchName.includes(lowerValue) ||
        yearName.includes(lowerValue)
      );
    });

    setFilteredBooks(result);
  };

  const handleApplyFilters = ({
    branches: selectedBranchIds = [],
    years: selectedYearIds = [],
  }) => {
    let result = filteredBooks;

    if (selectedBranchIds.length > 0) {
      result = result.filter((book) => {
        if (typeof book.branch === "number")
          return selectedBranchIds.includes(book.branch);
        if (typeof book.branch === "string")
          return selectedBranchIds.some(
            (id) => branches.find((b) => b.id === id)?.name === book.branch
          );
        if (book.branch && typeof book.branch === "object") {
          return selectedBranchIds.includes(book.branch.id);
        }
        return false;
      });
    }

    if (selectedYearIds.length > 0) {
      result = result.filter((book) => {
        if (typeof book.year === "number")
          return selectedYearIds.includes(book.year);
        if (typeof book.year === "string")
          return selectedYearIds.some(
            (id) => years.find((y) => y.id === id)?.name === book.year
          );
        if (book.year && typeof book.year === "object") {
          return selectedYearIds.includes(book.year.id);
        }
        return false;
      });
    }

    setFilteredBooks(result);
  };

  const handleClearFilters = () => {
    setFilteredBooks(books);
    setSearchValue("");
  };

  return (
    <div className="flex-1 bg-black min-h-screen text-white">
      <div className="w-[80%] mx-auto py-6">
        <WelcomeBanner />

        {/* Centered SearchBox */}
        <div className="flex justify-center mt-6 mb-6">
          <div className="w-full  max-w-3xl justify-items-center">
            <SearchBox
              placeholder="Search by branch or year"
              value={searchValue}
              handleSearch={handleSearch}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Sidebar */}
          <div className="hidden md:block w-full md:w-64">
            <FilterSidebar
              branches={branches}
              years={years}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
            />
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-8">
            {/* <BranchSpotlight branches={branches} /> */}
            {filteredBooks.length > 0 ? (
              <BookListings books={filteredBooks} />
            ) : (
              <div className="text-center text-gray-400 py-10">
                No records found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Loader
export async function homeLoader() {
  try {
    const [booksRes, branchesRes, yearsRes] = await Promise.all([
      apiClient.get("booksets/"),
      apiClient.get("branches/"),
      apiClient.get("years/"),
    ]);
    return {
      books: booksRes.data,
      branches: branchesRes.data,
      years: yearsRes.data,
    };
  } catch (error) {
    console.error(error);
    throw new Response("Failed to load data", { status: 500 });
  }
}
