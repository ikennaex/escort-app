import React from "react";

const mockBlacklist = [
  {
    id: 1,
    name: "James O.",
    reason: "Payment fraud / chargeback issues",
    date: "Sept 1, 2025",
  },
  {
    id: 2,
    name: "Victor A.",
    reason: "Harassment and misconduct",
    date: "Aug 22, 2025",
  },
  {
    id: 3,
    name: "Linda P.",
    reason: "Fake identity provided",
    date: "Aug 10, 2025",
  },
];

const EscortBlacklisted = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-pink-600 mb-4">
        Blacklisted Users
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-pink-100 text-pink-700">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Date Blacklisted</th>
            </tr>
          </thead>
          <tbody>
            {mockBlacklist.map((entry) => (
              <tr
                key={entry.id}
                className="border-t hover:bg-pink-50 transition bg-pink-200"
              >
                <td className="p-3 font-medium">{entry.name}</td>
                <td className="p-3">{entry.reason}</td>
                <td className="p-3 text-gray-500">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EscortBlacklisted;
