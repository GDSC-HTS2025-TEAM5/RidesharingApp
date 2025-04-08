import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/ui/BackButton";

const Support = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const faqs = [
    {
      question: "How do I book a ride?",
      answer: "Go to the Rider Dashboard and fill out your ride details.",
    },
    {
      question: "Can I cancel a ride?",
      answer: "Yes. Just revisit the ride request and click 'Cancel Ride'.",
    },
    {
      question: "How do I become a driver?",
      answer: "Go to the Driver Dashboard and follow the verification process.",
    },
  ];

  const handleSubmit = () => {
    alert("Support message submitted!");
    setMessage("");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <BackButton />
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Support</h2>

        {/* FAQ Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Frequently Asked Questions</h3>
          <ul className="space-y-2">
            {faqs.map((faq, index) => (
              <li key={index}>
                <p className="font-medium">{faq.question}</p>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;