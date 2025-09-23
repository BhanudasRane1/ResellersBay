import { useState } from "react";
import { Mail } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Example API request — replace with your backend endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="bg-black text-white py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We're here to help! Whether you have questions about book listings,
          selling, or need general assistance, our team is ready to respond.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-4">
          <Mail className="text-teal-400" size={22} />
          <div>
            <h3 className="font-bold text-lg">Get in Touch</h3>
            <p className="text-gray-400 text-sm">
              Have questions, feedback, or need support? Fill out the form below
              and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message here..."
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded transition"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting..." : "Submit Inquiry"}
          </button>

          {status === "success" && (
            <p className="text-green-400 text-sm mt-2">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
