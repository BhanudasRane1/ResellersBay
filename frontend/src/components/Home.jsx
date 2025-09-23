import WelcomeBanner from "./WelcomeBanner";
import FilterSidebar from "./FilterSideBar";
import BranchSpotlight from "./BranchSpotLight";
import BookListings from "./BookListings";
import SearchBox from "./SearchBox";
import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

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
            <BranchSpotlight />
            <BookListings />
          </div>
        </div>
      </div>
    </div>
  );
}
