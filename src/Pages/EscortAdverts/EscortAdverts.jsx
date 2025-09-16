import React from "react";

const mockAdverts = [
  {
    id: 1,
    title: "Weekend Getaway Special",
    description:
      "Book now and enjoy a luxury weekend experience with a 20% discount.",
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80",
    postedBy: "Sophia James",
    date: "Sept 14, 2025",
  },
  {
    id: 2,
    title: "Dinner Date Promo",
    description:
      "Romantic dinner dates at top restaurants — book your slot today!",
    image:
      "https://images.unsplash.com/photo-1520207582701-9e8a3dc1f1a1?auto=format&fit=crop&w=800&q=80",
    postedBy: "Amara Johnson",
    date: "Sept 10, 2025",
  },
  {
    id: 3,
    title: "Travel Companion Offer",
    description:
      "Available for short trips and vacations. Let’s make memories together!",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    postedBy: "Chloe Smith",
    date: "Sept 1, 2025",
  },
];

const EscortAdverts = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockAdverts.map((ad) => (
        <div
          key={ad.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{ad.title}</h2>
            <p className="text-sm text-gray-600">{ad.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
              <span>Posted by {ad.postedBy}</span>
              <span>{ad.date}</span>
            </div>
            <button className="mt-3 bg-pink-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-pink-600 transition">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EscortAdverts;
