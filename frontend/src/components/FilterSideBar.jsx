// FilterSidebar.jsx
export default function FilterSideBar() {
  return (
    <aside className="bg-[#111] text-white p-4 rounded-md w-full md:w-64">
      <h2 className="text-lg font-bold mb-2">Filter Books</h2>
      <p className="text-sm text-gray-400 mb-4">Narrow down your search results.</p>

      {/* Branches */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Branches</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="branch" defaultChecked /> All Branches
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="branch" /> BE
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="branch" /> TE
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="branch" /> SE
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="branch" /> FE
          </label>
        </div>
      </div>

      {/* Academic Year */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Academic Year</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="year" defaultChecked /> All Years
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="year" /> First Year (FE)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="year" /> Second Year (SE)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="year" /> Third Year (TE)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="year" /> Final Year (BE)
          </label>
        </div>
      </div>

      <button className="bg-black border border-gray-600 text-white w-full py-2 rounded hover:bg-gray-900">
        Clear Filters
      </button>
    </aside>
  );
}
