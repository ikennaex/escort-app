import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Eye } from "lucide-react";
import { baseUrl } from "../../baseUrl";
import { Link } from "react-router";

const AdminBlacklistedEscorts = () => {
  const [blacklistedEscorts, setBlacklistedEscorts] = useState([]);

  const fetchBlacklistedEscorts = async () => {
    try {
      const response = await axios.get(`${baseUrl}admin/blacklist`);
      setBlacklistedEscorts(response.data.blacklists);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlacklistedEscorts();
  }, []);

  console.log(blacklistedEscorts);

  return (
    <div className="bg-[#0A0E27] min-h-screen text-white px-6 py-8">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-2">Blacklisted Escorts</h2>
      <p className="text-gray-400 mb-8">Speak Up. Stay Safe.</p>

      {/* Banner */}
      <div className="bg-purple-800 text-center text-white p-6 rounded-xl mb-6">
        <h1 className="text-4xl font-extrabold">Most Wanted</h1>
        <p className="text-2xl text-pink-400 font-semibold">
          Help us find these people
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blacklistedEscorts.length === 0 ? (
          <p className="text-gray-400 italic col-span-full text-center">
            No blacklisted escorts found.
          </p>
        ) : (
          blacklistedEscorts.map((escort, index) => (
            <Link to={`/escorts/${escort?.escort?._id}`} key={index}>
            <div
              key={index}
              className="bg-gray-900 border border-pink-500/40 rounded-xl overflow-hidden shadow-lg hover:shadow-pink-600/30 transition"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={escort?.escort?.verificationImage || "/placeholder.jpg"}
                  alt={escort?.escort?.username}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <h3 className="text-xl font-bold uppercase text-white tracking-widest">
                    BLACKLISTED
                  </h3>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-pink-400 text-sm font-semibold">
                  Blacklisted Escort
                </p>
                <div className="flex items-center text-gray-400 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {escort?.escort?.city && escort?.escort?.state
                    ? `${escort.escort.city}, ${escort.escort.state}`
                    : escort?.escort?.city || escort?.state || "Unknown"}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {escort?.escort?.username || "Unknown"}
                </h4>

                {/* <div className="flex items-center text-gray-400 text-sm">
                  <Eye className="h-4 w-4 mr-1" />{" "}
                  {escort?.views || Math.floor(Math.random() * 100)}
                </div> */}
              </div>
            </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminBlacklistedEscorts;
