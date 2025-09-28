import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

export default function BookInquiryForm({ book = {}, onCancel }) {
  const { id, title } = book;

  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success("Inquiry sent successfully!", { position: "top-right" });
      } else {
        toast.error(actionData.error || "Failed to send inquiry.", {
          position: "top-right",
        });
      }
    }
  }, [actionData]);

  return (
    <div className="max-w-5xl mx-auto bg-transparent px-4">
      <div className="bg-gray-900 rounded-md p-6 pt-8 relative">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-2 right-2 p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        )}

        <h2 className="text-xl font-semibold mb-4">
          Book Inquiry: <span className="text-teal-400">{title}</span>
        </h2>

        <Form method="post" className="space-y-4">
          <input type="hidden" name="booksetId" value={id} />

          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              name="name"
              className="w-full px-3 py-2 rounded bg-black/50 border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              name="email"
              type="email"
              className="w-full px-3 py-2 rounded bg-black/50 border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Message</label>
            <textarea
              name="message"
              rows={6}
              className="w-full px-3 py-2 rounded bg-black/50 border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Hi, is this book set still available?"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded text-sm font-medium disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </button>
            <button
              type="reset"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
            >
              Clear
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
