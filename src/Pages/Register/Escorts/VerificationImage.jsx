import React, { useContext, useEffect, useState } from "react";
import { verificationimg } from "../../../../imports";
import { baseUrl } from "../../../baseUrl";
import { UserContext } from "../../../Contexts/UserContext";
import Loader from "../../../Components/Loaders/Loader";
import { useNavigate } from "react-router";
import { User } from "lucide-react";
import { FormContext } from "../../../Contexts/FormContext";
import { ToastContainer, toast } from "react-toastify";

const VerificationImage = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const { api, user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { markStepCompleted, completedSteps } = useContext(FormContext);

  useEffect(() => {
    if (!completedSteps.includes(4)) {
      navigate("/escort-gallery");
    }
  }, [completedSteps, navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // save the actual file for upload
      setPreview(URL.createObjectURL(selectedFile)); // show preview
    }
  };

  const handleDelete = () => {
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.success("Please select an image first", {
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }

    const formData = new FormData();
    formData.append("verificationImg", file);

    try {
      setLoading(true);
      const response = await api.put(`${baseUrl}escortverification`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
      markStepCompleted(5);
      navigate("/");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      {/* Progress bar */}
      <div className="flex flex-col w-full">
        <div className="flex gap-2">
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
        </div>
        <p className="font-bold text-white text-center mt-4">Step 6/6</p>
      </div>

      {/* Upload section */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mt-8 w-full max-w-md text-center">
        <h2 className="text-lg font-semibold text-white">
          Upload Verification Image
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Please upload a clear image of you holding a paper with OSCROVILLA and
          your Username clearly written on it.
        </p>

        {/* Default guide image */}
        <img
          src={verificationimg}
          alt="Verification Example"
          className="mt-4 w-full h-56 object-contain rounded-lg border border-gray-700"
        />

        {/* Preview */}
        {preview ? (
          <div className="mt-4 relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-56 object-contain rounded-lg border border-yellow-400 bg-black"
            />
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg shadow"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="mt-4 h-56 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg text-gray-500">
            No file selected
          </div>
        )}

        {/* Upload Button */}
        <div className="mt-6">
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-customPink text-white px-6 py-2 rounded-xl font-semibold hover:bg-pink-500 transition"
          >
            Choose File
          </label>
          <input
            name="verificationImg"
            id="fileInput"
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 cursor-pointer bg-customPink text-white px-6 py-2 rounded-xl font-semibold hover:bg-pink-500 transition"
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default VerificationImage;
