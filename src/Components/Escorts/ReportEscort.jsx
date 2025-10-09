import React, { useState } from "react";

const ReportEscort = () => {
  const [showModal, setShowModal] = useState(true);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle report submission logic here
    setShowModal(false);
    setReason("");
    setDetails("");
  };

  return (
    <>
      {/* Trigger Div */}
      <div
        onClick={() => setShowModal(true)}
        className="text-sm text-red-500 hover:underline cursor-pointer"
      >
        Report Escort
      </div>

      {/* Popup Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* Popup Content */}
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Report Escort
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Details (optional)
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  className="w-full border rounded-lg p-2 resize-none outline-none focus:ring-2 focus:ring-customPink"
                  placeholder="Describe what happened..."
                />
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
