// BranchSpotlight.jsx
export default function BranchSpotlight() {
  const branches = [
    { name: "BE", desc: "Bachelor of Engineering", img: "https://picsum.photos/300/200?1" },
    { name: "TE", desc: "Third Year Engineering", img: "https://picsum.photos/300/200?2" },
    { name: "SE", desc: "Second Year Engineering", img: "https://picsum.photos/300/200?3" },
  ];

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Branch Spotlight</h2>

      {/* Mobile carousel */}
      <div className="md:hidden overflow-x-auto -mx-4 px-4">
        <div className="flex gap-4">
          {branches.map((b, i) => (
            <div key={i} className="min-w-[75%] flex-shrink-0 rounded-md overflow-hidden bg-gray-800 text-white">
              <img src={b.img} alt={b.name} className="w-full h-40 object-cover" />
              <div className="p-2">
                <h3 className="font-bold">{b.name}</h3>
                <p className="text-sm text-gray-400">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {branches.map((b, i) => (
          <div key={i} className="rounded-md overflow-hidden bg-gray-800 text-white">
            <img src={b.img} alt={b.name} className="w-full h-40 object-cover" />
            <div className="p-2">
              <h3 className="font-bold">{b.name}</h3>
              <p className="text-sm text-gray-400">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
