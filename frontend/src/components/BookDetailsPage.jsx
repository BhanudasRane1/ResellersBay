import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookGallery from "./BookGallery";
import BookInfoCard from "./BookInfoCard";
import BookListTable from "./BookListTable";
import BookInquiryForm from "./BookInquiryForm";
import apiClient from "../api/apiClient";

export default function BookDetailsPage() {
  const bookSet = useLoaderData(); // fetched from loader
  const [selected, setSelected] = useState(0);
  const [showInquiry, setShowInquiry] = useState(false);

  // Prepare gallery images from BookSet and its individual books
  const images = [
    bookSet.image,
    ...bookSet.books.map((b) => b.image).filter(Boolean),
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Gallery */}
        <div>
          <BookGallery
            images={images}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        {/* Right: Info card */}
        <div className="flex flex-col gap-6">
          {!showInquiry && (
            <BookInfoCard
              bookSet={bookSet}
              onInquiry={() => setShowInquiry(true)}
            />
          )}
          {showInquiry && (
            <BookInquiryForm
              book={{
                id: bookSet.id,
                title: bookSet.books[0]?.name || `Book Set #${bookSet.id}`,
                author: bookSet.seller.name,
                img: images[0],
                description: bookSet.description,
                reference: `BK-${bookSet.id}`,
              }}
              onSuccess={() => {}}
              onCancel={() => setShowInquiry(false)}
            />
          )}
        </div>
      </div>

      {/* Below: Individual books table */}
      <div className="max-w-[1200px] mx-auto mt-10">
        <BookListTable items={bookSet.books} />
      </div>
    </div>
  );
}

// Loader to fetch bookset by id
export async function bookDetailsLoader({ params }) {
  try {
    console.log("Fetching bookset with id:", params.id);
    const res = await apiClient.get(`booksets/${params.id}/`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching bookset:", error);
    throw new Response("Failed to load book details", { status: 500 });
  }
}

export async function bookInquiryAction({ request }) {
  const formData = await request.formData();

  const payload = {
    bookset_id: formData.get("booksetId"),
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  try {
    const res = await apiClient.post("book-inquiries/", payload);
    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || "Submission failed. Try again.",
    };
  }
}
