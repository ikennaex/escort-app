import React, { useState } from "react";

const EscortFAQS = () => {
  const faqs = [
    {
      id: 1,
      question: "How do I book an escort?",
      answer:
        "You can book directly through our platform by selecting your preferred escort",
    },
    {
      id: 2,
      question: "Are my details kept confidential?",
      answer:
        "Yes, we prioritize your privacy. All client information is kept strictly confidential and secure.",
    },
    {
      id: 3,
      question: "What payment methods are accepted?",
      answer:
        "We accept major credit cards, debit cards, and secure online payments.",
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-pink-100 p-6 h-screen">
      <h2 className="text-2xl font-bold text-pink-500 mb-6">Escort FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white p-4 shadow-md cursor-pointer"
            onClick={() => toggleFAQ(faq.id)}
          >
            <h3 className="text-lg font-semibold text-pink-500">
              {faq.question}
            </h3>
            {openId === faq.id && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EscortFAQS;
