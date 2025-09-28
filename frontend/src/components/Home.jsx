import WelcomeBanner from "./WelcomeBanner";
import FilterSidebar from "./FilterSideBar";
import BranchSpotlight from "./BranchSpotLight";
import BookListings from "./BookListings";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const { books, branches, years } = useLoaderData();

  const [filteredBooks, setFilteredBooks] = useState(books);

  // Home.jsx (filter function)
  const handleApplyFilters = ({
    branches: selectedBranchIds = [],
    years: selectedYearIds = [],
  }) => {
    let result = books;
    console.log("Applying filters:", { selectedBranchIds, selectedYearIds });
    // Convert selected branch ids -> names (from branches list)
    const selectedBranchNames = selectedBranchIds
      .map((id) => branches.find((b) => b.id === id))
      .filter(Boolean)
      .map((b) => b.name);

    // Convert selected year ids -> names
    const selectedYearNames = selectedYearIds
      .map((id) => years.find((y) => y.id === id))
      .filter(Boolean)
      .map((y) => y.name);

    console.log("Names after applying", {
      selectedBranchNames,
      selectedYearNames,
    });
    if (selectedBranchIds.length > 0) {
      result = result.filter((book) => {
        // book.branch could be number (id) OR string (name) OR object {id,name}
        if (typeof book.branch === "number")
          return selectedBranchIds.includes(book.branch);
        if (typeof book.branch === "string")
          return selectedBranchNames.includes(book.branch);
        if (book.branch && typeof book.branch === "object")
          return (
            selectedBranchIds.includes(book.branch.id) ||
            selectedBranchNames.includes(book.branch.name)
          );
        return false;
      });
    }

    if (selectedYearIds.length > 0) {
      result = result.filter((book) => {
        if (typeof book.year === "number")
          return selectedYearIds.includes(book.year);
        if (typeof book.year === "string")
          return selectedYearNames.includes(book.year);
        if (book.year && typeof book.year === "object")
          return (
            selectedYearIds.includes(book.year.id) ||
            selectedYearNames.includes(book.year.name)
          );
        return false;
      });
    }

    setFilteredBooks(result);
  };

  const handleClearFilters = () => {
    setFilteredBooks(books);
  };

  return (
    <div className="flex-1 bg-black min-h-screen text-white">
      <div className="w-[80%] mx-auto py-6">
        <WelcomeBanner />

        <div className="block md:hidden mt-6 mb-4">
          <SearchBox
            label={null}
            placeholder="Search by book name or branch"
            value={searchValue}
            handleSearch={setSearchValue}
          />
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
            <BranchSpotlight branches={branches} />
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
