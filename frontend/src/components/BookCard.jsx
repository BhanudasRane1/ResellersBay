// BookCard.jsx
import { useNavigate } from "react-router-dom";

export default function BookCard({
  id,
  branch,
  year,
  image,
  total_price,
  books,
}) {
  const navigate = useNavigate();

  const openDetails = () => {
    // navigate to book details page; adjust route as needed
    navigate(`/book/${id}`);
  };
  const displayImg =
    image ||
    (books.length > 0 ? books[0].image : "https://via.placeholder.com/300x200");
  return (
    <div className="bg-gray-900 text-white rounded-md overflow-hidden">
      <img
        src={displayImg}
        alt="book set"
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-lg">{branch}</h3>
        <p className="text-sm text-gray-400">{year}</p>
        <p className="text-green-400 font-semibold mt-2">₹ {total_price}</p>
        <button
          onClick={openDetails}
          className="bg-teal-500 hover:bg-teal-600 w-full mt-3 py-2 rounded text-sm font-semibold"
        >
          Quick View
        </button>
      </div>
    </div>
  );
}
