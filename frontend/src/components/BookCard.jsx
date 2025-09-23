// BookCard.jsx
export default function BookCard({ title, year, price, img }) {
  return (
    <div className="bg-gray-900 text-white rounded-md overflow-hidden">
      <img src={img} alt={title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-400">{year}</p>
        <p className="text-green-400 font-semibold mt-2">₹ {price}</p>
        <button className="bg-teal-500 hover:bg-teal-600 w-full mt-3 py-2 rounded text-sm font-semibold">
          Quick View
        </button>
      </div>
    </div>
  );
}
