import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const EscortContactAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent to the admin!", {
      autoClose: 3000,
      position: "top-right",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-pink-100 p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-pink-500 mb-6">
        Contact Admin Via
      </h2>
      {/* <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 space-y-4 max-w-md mx-auto"
      >
        <div>
          <label className="block text-pink-500 font-medium mb-1">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block text-pink-500 font-medium mb-1">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block text-pink-500 font-medium mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
        >
          Send Message
        </button>
      </form> */}

      <div className="flex flex-wrap gap-3 p-4 justify-around">
        <a
          href="mailto:oscrovilla@gmail.com"
          className="flex items-center gap-6 cursor-pointer bg-white p-4 px-8 rounded-xl hover:bg-gray-100 transition"
        >
          <img
            className="h-8"
            src="https://cdn-icons-png.flaticon.com/128/732/732200.png"
            alt="Email Icon"
          />
          <span className="font-medium">Email</span>
        </a>

        <a
          href="https://wa.me/447892944918"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          <div className="flex items-center gap-6 cursor-pointer bg-green-50 p-4 px-8 rounded-xl">
            <img
              className="h-8"
              src="https://cdn-icons-png.flaticon.com/128/3670/3670051.png"
              alt=""
            />
            <span className="font-medium">WhatsApp</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default EscortContactAdmin;
