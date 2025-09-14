import React, { useContext, useEffect, useState } from "react";
import { Upload, ImagePlus, Trash2 } from "lucide-react";
import Loader from "../../../Components/Loaders/Loader";
import { UserContext } from "../../../Contexts/UserContext";
import { useNavigate } from "react-router";
import { FormContext } from "../../../Contexts/FormContext";

const Gallery = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const { api } = useContext(UserContext);
  const { markStepCompleted, completedSteps } = useContext(FormContext);

  useEffect(() => {
    if (!completedSteps.includes(3)) {
      navigate("/escort-rates");
    }
  }, [completedSteps, navigate]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setGallery([...gallery, ...previews]);
  };

  const removeImage = (index) => {
    const updated = [...gallery];
    updated.splice(index, 1);
    setGallery(updated);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      // send gallery as an array
      gallery.forEach((item) => {
        formData.append("gallery", item.file);
      });

      const response = await api.put("escortgallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.message);
      alert(response.data.message);
      markStepCompleted(4);
      navigate("/escort-verification");
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 mx-auto">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
        </div>

        <div>
          <p className="font-bold text-white text-center mt-4"> Step 5/6</p>
        </div>
      </div>
      {/* Heading */}
      <h1 className="font-bold text-center text-2xl text-white mb-6">
        Escort Gallery Upload
        <p className="text-xl">
          Note: First Image will be used as your Profile Image
        </p>
      </h1>

      {/* Upload Area */}
      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-600 rounded-2xl cursor-pointer hover:bg-purple-50 transition">
        <Upload className="w-8 h-8 text-purple-600 mb-2" />
        <span className="text-gray-500 font-medium">
          Click or drag to upload
        </span>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Preview Gallery */}
      {gallery.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {gallery.map((img, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={img.url}
                alt="preview"
                className="w-full h-40 object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-pink-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {gallery.length > 0 && (
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="mt-6 w-full bg-purple-800 text-white py-3 rounded-xl font-semibold shadow hover:bg-purple-700 transition disabled:bg-purple-800/50 mx-auto flex items-center justify-center"
        >
          {loading ? <Loader /> : "Upload Gallery"}
        </button>
      )}
    </div>
  );
};

export default Gallery;
