import React from "react";

const mockReviews = [
  {
    id: 1,
    user: "John D.",
    rating: 5,
    comment:
      "Amazing experience! Very professional and exceeded my expectations.",
    date: "Sept 10, 2025",
  },
  {
    id: 2,
    user: "Sophia M.",
    rating: 4,
    comment:
      "Really enjoyable, the atmosphere was great. Will definitely book again.",
    date: "Aug 28, 2025",
  },
  {
    id: 3,
    user: "Michael B.",
    rating: 5,
    comment: "Outstanding service, everything was perfect from start to finish!",
    date: "Aug 15, 2025",
  },
];

const EscortReviews = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockReviews.map((review) => (
        <div
          key={review.id}
          className="bg-white shadow-md p-4 hover:shadow-lg transition flex flex-col gap-3"
        >
          {/* Reviewer Info */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-pink-600">{review.user}</h3>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>

          {/* Rating */}
          <div className="flex text-yellow-400 text-sm">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>

          {/* Comment */}
          <p className="text-gray-600 text-sm">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default EscortReviews;
