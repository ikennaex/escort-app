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
import { SlidersHorizontal } from "lucide-react";
import FilterBox from "../FilterBox/FilterBox";
import { isFresh } from "./FreshBadge";

const Escorts = () => {
  const [loading, setLoading] = useState(true);
  const [escorts, setEscorts] = useState([]);
  const [error, setError] = useState("");
  // for pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);

  const handlePopUp = () => {
    setOpen(!open);
  };

  const loadEscorts = async () => {
    try {
      const response = await fetchEscorts(page, 10);
      setEscorts(response.escortDoc);
      setTotalPages(response.totalPages);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    loadEscorts();
  }, [page]);

  console.log(escorts);

  return (
    <div className="p-2 bg-black pb-10">
      <FilterBox open={open} handlePopUp={handlePopUp} />

      <div className="flex items-center justify-between">
        <p className="text-center text-white text-lg font-bold my-4">
          All Escorts
        </p>
      {loading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
        <div onClick={handlePopUp} className="flex">
          <SlidersHorizontal className="text-yellow-400 ml-auto" />
        </div>
      </div>

      <div className="grid lg:grid-cols-5 grid-cols-2 gap-3">
        {error && (
          <div className="text-red-700 text-center flex items-center justify-center">
            {error}
          </div>
        )}
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
              <div className="absolute bottom-0 left-0 text-white lg:p-4 p-2 bg-pink-950/70 w-full lg:h-36 flex flex-col justify-end">
                {/* Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-md">{item.displayName}</p>
                    <CheckBadgeIcon className="text-blue-500 h-4" />
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
                  {item.about?.split(" ").slice(0, 5).join(" ")}
                  {item.about?.split(" ").length > 20 ? "..." : ""}
                </p>
              </div>
              {(item.premium) && (
                <div className="absolute top-3 right-[-40px] w-40 bg-blue-500 text-white text-center text-xs font-bold py-1 transform rotate-45 shadow-lg drop-shadow-xl">
                  Premium
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Escorts;
