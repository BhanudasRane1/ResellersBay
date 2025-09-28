import { useState } from "react";

export default function FilterSideBar({
  branches = [],
  years = [],
  onApply,
  onClear,
}) {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  const handleBranchChange = (branchId) => {
    setSelectedBranches((prev) =>
      prev.includes(branchId)
        ? prev.filter((id) => id !== branchId)
        : [...prev, branchId]
    );
  };

  const handleYearChange = (yearId) => {
    setSelectedYears((prev) =>
      prev.includes(yearId)
        ? prev.filter((id) => id !== yearId)
        : [...prev, yearId]
    );
  };

  const applyFilters = () => {
    if (onApply) onApply({ branches: selectedBranches, years: selectedYears });
  };

  const clearFilters = () => {
    setSelectedBranches([]);
    setSelectedYears([]);
    if (onClear) onClear();
  };

  return (
    <aside className="bg-[#111] text-white p-4 rounded-md w-full md:w-64">
      <h2 className="text-lg font-bold mb-2">Filter Books</h2>
      <p className="text-sm text-gray-400 mb-4">
        Narrow down your search results.
      </p>

      {/* Branches */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Branches</h3>
        <div className="space-y-2 text-sm">
          {branches.map((b) => (
            <label key={b.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedBranches.includes(b.id)}
                onChange={() => handleBranchChange(b.id)}
              />
              {b.name}
            </label>
          ))}
        </div>
      </div>

      {/* Years */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Academic Year</h3>
        <div className="space-y-2 text-sm">
          {years.map((y) => (
            <label key={y.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedYears.includes(y.id)}
                onChange={() => handleYearChange(y.id)}
              />
              {y.name}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={applyFilters}
          className="bg-teal-500 hover:bg-teal-600 text-white w-full py-2 rounded"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="bg-black border border-gray-600 text-white w-full py-2 rounded hover:bg-gray-900"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
