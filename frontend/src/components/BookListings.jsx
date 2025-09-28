// BookListings.jsx
import { useLoaderData } from "react-router-dom";
import BookCard from "./BookCard";

// --- component ---
export default function BookListings({ books }) {
  return (
    <section className="mt-6">
      <h2 className="text-xl font-bold mb-4">All Book Listings</h2>

      {/* Mobile carousel of book cards */}
      <div className="md:hidden overflow-x-auto -mx-4 px-4">
        <div className="flex gap-4">
          {books.map((book) => (
            <div key={book.id} className="min-w-[75%] flex-shrink-0">
              <BookCard {...book} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
}
