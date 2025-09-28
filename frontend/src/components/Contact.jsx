// ContactForm.jsx
import { Form, useActionData, useNavigation, redirect } from "react-router-dom";
import { Mail } from "lucide-react";
import apiClient from "../api/apiClient";

// --- component ---
export default function ContactForm() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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

        <Form method="post" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
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
              placeholder="your.email@example.com"
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="(123) 456-7890"
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows="4"
              name="message"
              placeholder="Enter your message here..."
              className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-teal-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </Form>

        {actionData?.success &&
          alert("Message sent successfully! We will get back to you soon.")}
        {actionData?.error &&
          alert("Error sending message: " + JSON.stringify(actionData.error))}
      </div>
    </section>
  );
}

// --- action for handling form submission ---
export async function contactAction({ request }) {
  const formData = await request.formData();
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  try {
    await apiClient.post("contacts/", payload);
    // return inline success OR redirect
    return { success: true };
  } catch (error) {
    if (error.response) {
      return { success: false, error: error.response.data };
    }
    return { success: false, error: "Unexpected error" };
  }
}
