import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import {
  CheckBadgeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import Loader from "../../Components/Loaders/Loader";

const FilteredEscorts = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const [escorts, setEscorts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEscorts = async () => {
      setLoading(true);
      try {
        // turn params back into object
        const filters = Object.fromEntries(params.entries());

        const response = await axios.get(`${baseUrl}escorts/search`, {
          params: filters,
        });

        setEscorts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(err.response.data.message);
      }
    };

    fetchEscorts();
  }, [search]);

  return (
    <div className="p-2">
      <h1 className="font-bold text-white text-xl">Search Results</h1>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )}

      {escorts.length === 0 && (
        <div className="text-red-700 text-center flex items-center justify-center">
          No Escorts Found
        </div>
      )}

      {error && (
        <div className="text-red-700 text-center flex items-center justify-center">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 mt-2">
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
                  {item.about?.split(" ").slice(0, 10).join(" ")}
                  {item.about?.split(" ").length > 20 ? "..." : ""}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilteredEscorts;
