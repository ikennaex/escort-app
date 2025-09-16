import React from "react";

const mockRooms = [
  {
    id: 1,
    name: "Luxury Suite",
    description: "Spacious suite with king-size bed, jacuzzi, and private balcony.",
    price: "$250 / night",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    location: "Victoria Island, Lagos",
  },
  {
    id: 2,
    name: "Romantic Room",
    description: "Perfect for couples, cozy setting with soft lighting and decor.",
    price: "$150 / night",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b7?auto=format&fit=crop&w=800&q=80",
    location: "Lekki, Lagos",
  },
  {
    id: 3,
    name: "Private Penthouse",
    description: "Top floor luxury penthouse with rooftop view and hot tub.",
    price: "$400 / night",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    location: "Banana Island, Lagos",
  },
];

const EscortRooms = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockRooms.map((room) => (
        <div
          key={room.id}
          className="bg-white shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-pink-600">{room.name}</h2>
            <p className="text-sm text-gray-600">{room.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
              <span>{room.location}</span>
              <span className="font-bold text-pink-600">{room.price}</span>
            </div>
            <button className="mt-3 bg-pink-600 text-white text-sm px-4 py-2 hover:bg-pink-700 transition">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EscortRooms;
