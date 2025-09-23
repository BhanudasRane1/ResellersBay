import { useState } from "react";
import { PlusCircle, Upload, Trash2 } from "lucide-react";

export default function SellForm() {
  const [books, setBooks] = useState([{ name: "", type: "", price: "", image: null }]);

  const handleAddBook = () => {
    if (books.length < 6) {
      setBooks([...books, { name: "", type: "", price: "", image: null }]);
    }
  };

  const handleRemoveBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  const handleBookChange = (index, field, value) => {
    const updatedBooks = [...books];
    updatedBooks[index][field] = value;
    setBooks(updatedBooks);
  };

  return (
    <section className="bg-black text-white py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Seller Info */}
        <div className="bg-gray-900 p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4">Seller Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="e.g., John Doe"
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
            />
            <input
              type="email"
              placeholder="e.g., john.doe@example.com"
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
            />
          </div>
        </div>

        {/* Book Set Details */}
        <div className="bg-gray-900 p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4">Book Set Details</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <select className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400">
              <option>Select Branch</option>
              <option>CSE</option>
              <option>ECE</option>
              <option>ME</option>
            </select>
            <select className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400">
              <option>Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-6 text-gray-400 cursor-pointer hover:border-teal-400">
            <Upload size={24} className="mb-2" />
            <p>Upload Image</p>
          </div>
        </div>

        {/* Individual Books */}
        <div className="bg-gray-900 p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Individual Books (Max 6)</h3>
            <button
              type="button"
              onClick={handleAddBook}
              className="flex items-center gap-1 text-teal-400 hover:text-teal-500"
            >
              <PlusCircle size={18} /> Add Book
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {books.map((book, index) => (
              <div key={index} className="bg-black p-4 rounded-lg border border-gray-700 space-y-3 relative">
                <button
                  type="button"
                  onClick={() => handleRemoveBook(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
                <h4 className="font-semibold mb-2">Book #{index + 1}</h4>
                <input
                  type="text"
                  placeholder="e.g., Data Structures"
                  value={book.name}
                  onChange={(e) => handleBookChange(index, "name", e.target.value)}
                  className="w-full p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-teal-400"
                />
                <select
                  value={book.type}
                  onChange={(e) => handleBookChange(index, "type", e.target.value)}
                  className="w-full p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-teal-400"
                >
                  <option>Select type</option>
                  <option>Textbook</option>
                  <option>Reference</option>
                  <option>Guide</option>
                </select>
                <input
                  type="number"
                  placeholder="e.g., 500"
                  value={book.price}
                  onChange={(e) => handleBookChange(index, "price", e.target.value)}
                  className="w-full p-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-teal-400"
                />
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-4 text-gray-400 cursor-pointer hover:border-teal-400">
                  <Upload size={20} className="mb-1" />
                  <p className="text-sm">Upload Image</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-900 p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4">Description</h3>
          <textarea
            rows="4"
            placeholder="Provide details about the condition, edition, and any relevant information for the entire book set..."
            className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded transition"
        >
          Submit Book Listing
        </button>
      </div>
    </section>
  );
}