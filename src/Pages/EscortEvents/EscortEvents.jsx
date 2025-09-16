import React from "react";

const mockEvents = [
  {
    id: 1,
    name: "Luxury Gala Night",
    description:
      "An exclusive evening with fine dining, music, and networking. Limited seats available.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    location: "Lagos, Nigeria",
    date: "Sept 25, 2025",
  },
  {
    id: 2,
    name: "Romantic Beach Party",
    description:
      "Enjoy the sunset with great music, cocktails, and amazing company.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    location: "Ibiza Beach Resort",
    date: "Oct 5, 2025",
  },
  {
    id: 3,
    name: "Exclusive Yacht Cruise",
    description:
      "A private evening cruise with fine wine, food, and unforgettable experiences.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    location: "Victoria Island, Lagos",
    date: "Oct 20, 2025",
  },
];

const EscortEvents = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockEvents.map((event) => (
        <div
          key={event.id}
          className="bg-white shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-pink-600">{event.name}</h2>
            <p className="text-sm text-gray-600">{event.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
              <span>{event.location}</span>
              <span>{event.date}</span>
            </div>
            <button className="mt-3 bg-pink-600 text-white text-sm px-4 py-2 hover:bg-pink-700 transition">
              Reserve Spot
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EscortEvents;
