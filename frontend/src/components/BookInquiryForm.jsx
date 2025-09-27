import React, { useState } from "react";
import { X } from "lucide-react";

export default function BookInquiryForm({ book = {}, onSuccess, onCancel }) {
  const {
    id = 0,
    title = "Unknown Title",
    author = "Unknown Author",
    img = "https://picsum.photos/400/600",
    description = "No description available.",
    reference = "REF0000",
  } = book;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const validate = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErr("Please fill all fields.");
      return false;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email.trim())) {
      setErr("Enter a valid email.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");
    if (!validate()) return;

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800)); // simulate request
      const payload = {
        bookId: id,
        bookTitle: title,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };
      console.log("Inquiry submitted:", payload);
      setOk("Inquiry sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
      if (typeof onSuccess === "function") onSuccess(payload);
    } catch {
      setErr("Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-transparent px-4">
      <div className="bg-gray-900 rounded-md p-6 pt-8 relative">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close inquiry form"
            className="absolute top-2 right-2 p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        )}
        <h2 className="text-xl font-semibold mb-4">
          Book Inquiry: <span className="text-teal-400">{title}</span>
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Ask about availability, condition, price negotiation or pickup details.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded bg-black/50 border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 rounded bg-black/50 border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 rounded bg-black/50 border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Hi, is this book set still available? Can you share condition details?"
            />
          </div>

          {err && <div className="text-sm text-red-400">{err}</div>}
          {ok && <div className="text-sm text-green-400">{ok}</div>}

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Inquiry"}
            </button>
            <button
              type="button"
              onClick={() => {
                setName("");
                setEmail("");
                setMessage("");
                setErr("");
                setOk("");
              }}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}