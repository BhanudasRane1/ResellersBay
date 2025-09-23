// BookListings.jsx
import BookCard from "./BookCard";

export default function BookListings() {
  const books = [
    { title: "Advanced Thermodynamics Set", year: "BE (Final Year)", price: 2500, img: "https://picsum.photos/300/200?4" },
    { title: "Data Structures & Algorithms", year: "TE (Third Year)", price: 1800, img: "https://picsum.photos/300/200?5" },
    { title: "Circuit Theory Essentials", year: "SE (Second Year)", price: 1500, img: "https://picsum.photos/300/200?6" },
  ];

  return (
    <section className="mt-6">
      <h2 className="text-xl font-bold mb-4">All Book Listings</h2>

      {/* Mobile carousel of book cards */}
      <div className="md:hidden overflow-x-auto -mx-4 px-4">
        <div className="flex gap-4">
          {books.map((book, i) => (
            <div key={i} className="min-w-[75%] flex-shrink-0">
              <BookCard {...book} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {books.map((book, i) => (
          <BookCard key={i} {...book} />
        ))}
      </div>
    </section>
  );
}
