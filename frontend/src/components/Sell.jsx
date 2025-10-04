// SellForm.jsx
import React, { useState } from "react";
import {
  Form,
  useLoaderData,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../api/apiClient";

export default function SellForm() {
  const { branches, years, bookTypes } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const [books, setBooks] = useState([{ name: "", type: "", price: "" }]);

  // Show toast messages when actionData updates
  React.useEffect(() => {
    if (actionData?.success) {
      toast.success("BookSet submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    if (actionData?.error) {
      toast.error(`${actionData.error}`, {
        position: "top-right",
        autoClose: 4000,
      });
    }
  }, [actionData]);

  const addBook = () => {
    if (books.length < 6)
      setBooks([...books, { name: "", type: "", price: "" }]);
  };

  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Sell Your Books</h2>

      <Form method="post" encType="multipart/form-data" className="space-y-6">
        {/* Seller Info */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold mb-4">Seller Information</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              name="seller_name"
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 rounded bg-black border border-gray-700"
            />
            <input
              name="seller_email"
              type="email"
              placeholder="Email"
              required
              className="w-full p-2 rounded bg-black border border-gray-700"
            />
            <input
              name="seller_mobile"
              type="text"
              placeholder="Mobile"
              required
              className="w-full p-2 rounded bg-black border border-gray-700"
            />
          </div>
        </div>

        {/* BookSet Info */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold mb-4">Book Set Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="bookset_name"
              type="text"
              placeholder="Book Set Name"
              required
              className="w-full p-2 rounded bg-black border border-gray-700"
            />

            <select
              name="branch"
              required
              className="w-full p-2 rounded bg-black border border-gray-700"
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <select
              name="year"
              required
              className="w-full p-2 rounded bg-black border border-gray-700"
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
              name="bookset_image"
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0 file:text-sm
            file:font-semibold file:bg-teal-500 file:text-white
            hover:file:bg-teal-600"
            />
          </div>
        </div>

        {/* Books */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold mb-4">Individual Books</h3>
          {books.map((_, index) => (
            <div
              key={index}
              className="grid md:grid-cols-4 gap-4 mb-4 items-center"
            >
              <input
                name={`books[${index}][name]`}
                placeholder="Book Name"
                required
                className="w-full p-2 rounded bg-black border border-gray-700"
              />
              <select
                name={`books[${index}][book_type]`}
                required
                className="w-full p-2 rounded bg-black border border-gray-700"
              >
                <option value="">Book Type</option>
                {bookTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <input
                name={`books[${index}][price]`}
                type="number"
                placeholder="Price"
                required
                className="w-full p-2 rounded bg-black border border-gray-700"
              />
              <input
                type="file"
                name={`books[${index}][image]`}
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
              className="mt-2 px-4 py-2 bg-teal-600 text-white rounded"
            >
              + Add Book
            </button>
          )}
        </div>

        {/* Description */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-bold mb-4">Description</h3>
          <textarea
            name="description"
            rows="4"
            className="w-full p-2 rounded bg-black border border-gray-700"
          ></textarea>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={navigation.state === "submitting"}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 disabled:opacity-50"
          >
            {navigation.state === "submitting" ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </div>
  );
}

// Loader: fetch dropdown data
export async function sellLoader() {
  try {
    const [bRes, yRes, tRes] = await Promise.all([
      apiClient.get("branches/"),
      apiClient.get("years/"),
      apiClient.get("booktypes/"),
    ]);

    return {
      branches: bRes.data,
      years: yRes.data,
      bookTypes: tRes.data,
    };
  } catch (err) {
    console.error("Error loading form data:", err);
    throw new Response("Failed to load data", { status: 500 });
  }
}

// Action: submit form data
export async function sellAction({ request }) {
  const formData = await request.formData();

  try {
    const res = await apiClient.post("booksets/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true, data: res.data };
  } catch (err) {
    console.error("Error submitting form:", err);
    if (err.response) {
      return { error: JSON.stringify(err.response.data) };
    } else {
      return { error: "Unexpected error occurred. Try again later." };
    }
  }
}
