export default function BookListTable({ items }) {
  return (
    <div className="bg-gray-900 rounded-md p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Individual Books</h3>
      <div className="overflow-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-sm text-gray-400">
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Book Name</th>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t border-gray-800">
                <td className="py-3 px-3 text-sm text-gray-200">{it.id}</td>
                <td className="py-3 px-3 text-sm text-gray-200">{it.name}</td>
                <td className="py-3 px-3 text-sm text-gray-200">
                  {it.book_type}
                </td>
                <td className="py-3 px-3 text-sm text-gray-200 text-right">
                  ₹ {it.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
