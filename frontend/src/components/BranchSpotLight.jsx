import { useLoaderData } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function BranchSpotlight({ branches }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Branch Spotlight</h2>

      {/* Mobile carousel */}
      <div className="md:hidden overflow-x-auto -mx-4 px-4">
        <div className="flex gap-4">
          {branches.map((b) => (
            <div
              key={b.id}
              className="min-w-[75%] flex-shrink-0 rounded-md overflow-hidden bg-gray-800 text-white"
            >
              <img
                src={b.image || "https://picsum.photos/300/200?random"}
                alt={b.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-2">
                <h3 className="font-bold">{b.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {branches.map((b) => (
          <div
            key={b.id}
            className="rounded-md overflow-hidden bg-gray-800 text-white"
          >
            <img
              src={b.image || "https://picsum.photos/300/200?random"}
              alt={b.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <h3 className="font-bold">{b.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
