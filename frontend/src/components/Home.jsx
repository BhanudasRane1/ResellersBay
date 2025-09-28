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
  const { books, branches } = useLoaderData();

  return (
    <div className="flex-1 bg-black min-h-screen text-white">
      {/* Container set to 80% width and centered */}
      <div className="w-[80%] mx-auto py-6">
        {/* Welcome Banner */}
        <WelcomeBanner />

        {/* Mobile: show search instead of filter */}
        <div className="block md:hidden mt-6 mb-4">
          <SearchBox
            label={null}
            placeholder="Search by book name or branch"
            value={searchValue}
            handleSearch={setSearchValue}
          />
        </div>

        {/* Sidebar + Content */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Sidebar - visible on desktop only */}
          <div className="hidden md:block w-full md:w-64">
            <FilterSidebar />
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-8">
            <BranchSpotlight branches={branches} />
            <BookListings books={books} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Loader
export async function homeLoader() {
  try {
    const [booksRes, branchesRes] = await Promise.all([
      apiClient.get("booksets/"),
      apiClient.get("branches/"),
    ]);
    return {
      books: booksRes.data,
      branches: branchesRes.data,
    };
  } catch (error) {
    console.error(error);
    throw new Response("Failed to load data", { status: 500 });
  }
}
