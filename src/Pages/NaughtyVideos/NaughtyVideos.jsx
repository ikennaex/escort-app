import React from "react";

const mockVideos = [
  {
    id: 1,
    title: "Romantic Getaway Teaser",
    thumbnail:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    duration: "3:25",
    views: "12.3k",
  },
  {
    id: 2,
    title: "Luxury Lifestyle Vlog",
    thumbnail:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    duration: "5:10",
    views: "8.9k",
  },
  {
    id: 3,
    title: "Exclusive Yacht Party",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    duration: "7:45",
    views: "15.6k",
  },
];

const NaughtyVideos = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockVideos.map((video) => (
        <div
          key={video.id}
          className="bg-white shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <div className="relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1">
              {video.duration}
            </span>
          </div>
          <div className="p-3 flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-pink-600">
              {video.title}
            </h3>
            <p className="text-xs text-gray-500">{video.views} views</p>
            <button className="mt-2 bg-pink-600 text-white text-sm px-3 py-2 hover:bg-pink-700 transition">
              Watch Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NaughtyVideos;
