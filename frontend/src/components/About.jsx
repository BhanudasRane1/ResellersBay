import { Mail } from "lucide-react";
import bhanudasImg from "../assets/util/bhanudas.jpg";
import rohanImg from "../assets/util/rohan.jpg";

const teamMembers = [
  {
    name: "Bhanudas Rane",
    role: "FullStack Developer",
    description:
      "Crafts intuitive UIs, integrates APIs, writes scalable code, and improves user experience consistently.",
    email: "ranebhanudas786@gmail.com",
    image: bhanudasImg,
  },
  {
    name: "Rohan Shelar",
    role: "Backend Developer",
    description:
      "Designs robust APIs, optimizes databases, ensures data integrity, and maintains high system reliability.",
    email: "shelarrohan2000@gmail.com",
    image: rohanImg,
  },
];

export default function About() {
  return (
    <section className="bg-black text-white py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          The dedicated individuals behind Resellers Bay, committed to building
          the best platform for academic book exchange.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-lg font-bold mb-1">{member.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{member.role}</p>
            <p className="text-gray-300 mb-4 text-sm">{member.description}</p>
            <div className="mt-2">
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 text-teal-400 hover:underline text-sm"
              >
                <Mail size={16} />
                <span>{member.email}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

