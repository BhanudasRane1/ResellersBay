import React, { useState } from "react";
import BookGallery from "./BookGallery";
import BookInfoCard from "./BookInfoCard";
import BookListTable from "./BookListTable";
import BookInquiryForm from "./BookInquiryForm";

export default function BookDetailsPage() {
  const images = [
    "https://picsum.photos/900/500?random=15",
    "https://picsum.photos/300/200?random=16",
    "https://picsum.photos/300/200?random=12",
    "https://picsum.photos/300/200?random=13",
    "https://picsum.photos/300/200?random=14",
  ];

  const [selected, setSelected] = useState(0);
  const [showInquiry, setShowInquiry] = useState(false);

  const bookSet = {
    id: 101, // added id
    title: "First Year Engineering Complete Set", // added title
    price: 2500,
    seller: {
      name: "Bhanudas Rane",
      email: "bhanudas.rane@example.com",
      branch: "Computer Engineering",
      year: "Final Year",
    },
    description:
      "This comprehensive set includes essential textbooks for first-year engineering students. Covering subjects like Calculus, Physics, Engineering Graphics, and Basic Electrical Engineering, these books are in excellent condition, ideal for a student looking for a complete academic package.",
    individualBooks: [
      { id: 101, name: "Advanced Calculus", type: "Original", price: 700 },
      { id: 102, name: "Engineering Physics Vol. 1", type: "Second Hand", price: 600 },
      { id: 103, name: "Engineering Graphics", type: "Photocopy", price: 400 },
      { id: 104, name: "Basic Electrical Engineering", type: "Original", price: 800 },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Gallery */}
        <div>
          <BookGallery images={images} selected={selected} setSelected={setSelected} />
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
                title: bookSet.title,
                author: bookSet.seller.name,
                img: images[0],
                description: bookSet.description,
                reference: `BK-${bookSet.id}`
              }}
              onSuccess={() => {}}
              onCancel={() => setShowInquiry(false)}
            />
          )}
        </div>
      </div>

      {/* Below: Individual books table */}
      <div className="max-w-[1200px] mx-auto mt-10">
        <BookListTable items={bookSet.individualBooks} />
      </div>
    </div>
  );
}
