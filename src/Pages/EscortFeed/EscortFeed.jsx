import React from "react";

const mockEscorts = [
  {
    id: 1,
    name: "Sophia James",
    age: 24,
    location: "Lagos",
    bio: "Loves traveling and great conversations. Available for dinner dates.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    isActive: true,
  },
  {
    id: 2,
    name: "Amara Johnson",
    age: 27,
    location: "Abuja",
    bio: "Fun-loving, adventurous, and always smiling.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    isActive: false,
  },
  {
    id: 3,
    name: "Chloe Smith",
    age: 22,
    location: "Port Harcourt",
    bio: "Enjoys fine dining, music, and cozy nights.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    isActive: true,
  },
];

const EscortFeed = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockEscorts.map((escort) => (
        <div
          key={escort.id}
          className="bg-white shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={escort.image}
            alt={escort.name}
            className="w-full h-56 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{escort.name}</h2>
              {escort.isActive ? (
                <span className="bg-green-500 text-white px-3 py-1 text-xs">
                  Active
                </span>
              ) : (
                <span className="bg-red-500 text-white px-3 py-1 text-xs">
                  Inactive
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Age: {escort.age} • {escort.location}
            </p>
            <p className="text-sm text-gray-700">{escort.bio}</p>
            <button className="mt-3 bg-pink-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-pink-600 transition">
              View Profile
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EscortFeed;
