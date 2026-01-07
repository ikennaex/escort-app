import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../baseUrl";
import { useParams } from "react-router";

const ReportEscort = ({ handleShowModal, setShowModal, showModal }) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]); // store File objects
  const [previews, setPreviews] = useState([]); // store URLs for preview
  const escortId = useParams()

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Store File objects
    setImages((prev) => [...prev, ...files]);

    // Generate previews
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...imageUrls]);
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("reason", reason);
      formData.append("details", details);
      formData.append("escortId", escortId.id);

      // append multiple files
      images.forEach((file) => {
        formData.append("images", file);
      });

      const response = await axios.post(`${baseUrl}report`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      
      // Reset form
      setShowModal(false);
      setReason("");
      setDetails("");
      setImages([]);
      setPreviews([]);
    } catch (err) {
      console.error("Error submitting report:", err);
      alert(err.response.data.message);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-pink-50 rounded-2xl p-6 w-[90%] max-w-md shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Report Escort
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-customPink"
                >
                  <option value="">Select a reason</option>
                  <option value="fake-profile">Fake profile</option>
                  <option value="inappropriate-content">
                    Inappropriate content
                  </option>
                  <option value="scam-or-fraud">Scam or fraud</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Details
                </label>
                <textarea
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  className="w-full border rounded-lg p-2 resize-none outline-none focus:ring-2 focus:ring-customPink"
                  placeholder="Describe what happened..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proof of Misconduct (optional)
                </label>

                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-customPink transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    id="imageUpload"
                    className="hidden"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="imageUpload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-customPink mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm">
                      <span className="text-customPink font-medium">
                        Click to upload
                      </span>{" "}
                      or drag & drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      You can upload multiple images (max 5MB each)
                    </p>
                  </label>
                </div>

                {/* Preview */}
                {previews.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {previews.map((img, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden"
                      >
                        <img
                          src={img}
                          alt="Proof"
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-customPink hover:bg-red-600 text-white py-2 rounded-lg transition-all"
              >
                Submit Report
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportEscort;
