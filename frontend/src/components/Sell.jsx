import React, { useState, useEffect } from "react";
import apiClient from "../api/apiclient";

export default function SellForm() {
  // --- Seller Info ---
  const [seller, setSeller] = useState({ name: "", email: "", mobile: "" });

  const handleSellerChange = (field, value) => {
    setSeller({ ...seller, [field]: value });
  };

  // --- Dropdown Options ---
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [bookTypes, setBookTypes] = useState([]);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [booksetImage, setBooksetImage] = useState(null);

  // --- Books ---
  const [books, setBooks] = useState([
    { name: "", type: "", price: "", image: null },
  ]);

  const handleBookChange = (index, field, value) => {
    const updated = [...books];
    updated[index][field] = value;
    setBooks(updated);
  };

  const addBook = () => {
    if (books.length < 6) {
      setBooks([...books, { name: "", type: "", price: "", image: null }]);
    }
  };

  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  // --- Description ---
  const [description, setDescription] = useState("");

  // --- Fetch dropdown data ---
  useEffect(() => {
    Promise.all([
      apiClient.get("/branches/"),
      apiClient.get("/years/"),
      apiClient.get("/booktypes/"),
    ]).then(([bRes, yRes, tRes]) => {
      setBranches(bRes.data);
      setYears(yRes.data);
      setBookTypes(tRes.data);
    });
  }, []);

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Seller Info
    formData.append("seller_name", seller.name);
    formData.append("seller_email", seller.email);
    formData.append("seller_mobile", seller.mobile);

    // BookSet Info
    formData.append("branch", selectedBranch);
    formData.append("year", selectedYear);
    formData.append("description", description);
    if (booksetImage) formData.append("bookset_image", booksetImage);

    // Books
    books.forEach((book, index) => {
      formData.append(`books[${index}][name]`, book.name);
      formData.append(`books[${index}][book_type]`, book.type);
      formData.append(`books[${index}][price]`, book.price);
      if (book.image) formData.append(`books[${index}][image]`, book.image);
    });

    try {
      await apiClient.post("booksets/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Book listing submitted successfully!");
      // reset form
      setSeller({ name: "", email: "", mobile: "" });
      setSelectedBranch("");
      setSelectedYear("");
      setBooksetImage(null);
      setBooks([{ name: "", type: "", price: "", image: null }]);
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit listing.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Sell Your Books</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seller Info */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold mb-4">Seller Information</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={seller.name}
              onChange={(e) => handleSellerChange("name", e.target.value)}
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={seller.email}
              onChange={(e) => handleSellerChange("email", e.target.value)}
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
              required
            />
            <input
              type="text"
              placeholder="Mobile"
              value={seller.mobile}
              onChange={(e) => handleSellerChange("mobile", e.target.value)}
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
              required
            />
          </div>
        </div>

        {/* BookSet Info */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold mb-4">Book Set Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full p-2 rounded bg-black border border-gray-700"
              required
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2 rounded bg-black border border-gray-700"
              required
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="block mb-2">Upload BookSet Image</label>
            <input
              type="file"
              onChange={(e) => setBooksetImage(e.target.files[0])}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0 file:text-sm
                file:font-semibold file:bg-teal-500 file:text-white
                hover:file:bg-teal-600"
            />
          </div>
        </div>

        {/* Individual Books */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold mb-4">Individual Books</h3>
          {books.map((book, index) => (
            <div
              key={index}
              className="grid md:grid-cols-4 gap-4 mb-4 items-center"
            >
              <input
                type="text"
                placeholder="Book Name"
                value={book.name}
                onChange={(e) =>
                  handleBookChange(index, "name", e.target.value)
                }
                className="w-full p-2 rounded bg-black border border-gray-700"
                required
              />
              <select
                value={book.type}
                onChange={(e) =>
                  handleBookChange(index, "type", e.target.value)
                }
                className="w-full p-2 rounded bg-black border border-gray-700"
                required
              >
                <option value="">Book Type</option>
                {bookTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Price"
                value={book.price}
                onChange={(e) =>
                  handleBookChange(index, "price", e.target.value)
                }
                className="w-full p-2 rounded bg-black border border-gray-700"
                required
              />
              <input
                type="file"
                onChange={(e) =>
                  handleBookChange(index, "image", e.target.files[0])
                }
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0 file:text-sm
                  file:font-semibold file:bg-teal-500 file:text-white
                  hover:file:bg-teal-600"
              />
              {books.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBook(index)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {books.length < 6 && (
            <button
              type="button"
              onClick={addBook}
              className="mt-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              + Add Book
            </button>
          )}
        </div>

        {/* Description */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold mb-4">Description</h3>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-black border border-gray-700"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow hover:bg-teal-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
