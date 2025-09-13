import React, { useEffect, useState } from "react";
import {
  CheckBadgeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { fetchEscorts } from "./fetchEscorts";
import Loader from "../Loaders/Loader";


const Escorts = () => {
  const [loading, setLoading] = useState(true)
  const [escorts, setEscorts] = useState([]);
  const [error, setError] = useState("");
  // for pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadEscorts = async () => {
    try {
      const response = await fetchEscorts(page, 10);
      console.log(response);
      setEscorts(response.escortDoc);
      setTotalPages(response.totalPages);
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err.message);
      console.log(err);
    }
  };

  console.log(error);

  useEffect(() => {
    loadEscorts();
  }, [page]);

  return (
    <div className="p-1 bg-black py-10">
        {loading && <div className="flex items-center justify-center"><Loader /></div>}
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
        {error && <div className="text-red-700 text-center flex items-center justify-center">{error}</div>}
        {escorts.map((item) => (
          <Link to={`/escorts/${item._id}`}>
            <div
              key={item._id}
              className="relative overflow-hidden h-[300px] border-2 border-white"
            >
              {/* Background Image */}
              <img
                src={item.gallery[0]}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />

              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 text-white lg:p-4 p-2 h-2/5 bg-pink-950/70 w-full  flex flex-col justify-end">
                {/* Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-md">{item.displayName}</p>
                    <CheckBadgeIcon className="text-green-500 h-4" />
                  </div>
                  <HeartIcon className="h-5 text-red-500 justify-end" />
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 lg:mb-2">
                  <PhoneIcon className="h-4 text-white hidden md:block" />
                  <a
                    href={`tel:${item.phoneNumber}`}
                    className="text-blue-600 lg:text-sm text-[10px] hover:underline"
                  >
                    {item.phoneNumber}
                  </a>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 lg:mb-2">
                  <MapPinIcon className="h-4 text-white hidden md:block" />
                  <p className="lg:text-sm text-[10px]">
                    {item.city + ", " + item.state + ", " + item.country}
                  </p>
                </div>

                {/* Description */}
                <p className="lg:text-sm text-[10px] leading-relaxed">
                  {item.about}
                  {/* word count 20 */}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Escorts;
