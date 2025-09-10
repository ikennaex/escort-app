import React, { useState } from "react";
import { Upload, ImagePlus, Trash2 } from "lucide-react";

const Gallery = () => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages([...images, ...previews]);
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
        <p className="text-xl">Note: First Image will be used as your Profile Image</p>
      </h1>

      {/* Upload Area */}
      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-600 rounded-2xl cursor-pointer hover:bg-purple-50 transition">
        <Upload className="w-8 h-8 text-purple-600 mb-2" />
        <span className="text-white font-medium">
          Click or drag to upload
        </span>
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Preview Gallery */}
      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
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
                className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {images.length > 0 && (
        <button className="mt-6 w-full bg-purple-800 text-white py-3 rounded-xl font-semibold shadow hover:bg-purple-700 transition">
          Upload Gallery
        </button>
      )}
    </div>
  );
};

export default Gallery;
