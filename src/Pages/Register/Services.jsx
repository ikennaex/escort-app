import React, { useState } from "react";
import services from "../../data/services.json";
import { PlusCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";

const Services = () => {
    const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState([]);

  const handleToggle = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission

    navigate("/escort-rates");
  };

  return (
    <div className="p-2">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
        </div>

        <div>
          <p className="font-bold text-white text-center mt-4"> Step 3/6</p>
        </div>

        <form
          className="bg-pink-100 mt-4 rounded-sm p-4 flex flex-col gap-2"
          action=""
        >
          <div className="flex items-center justify-center gap-2">
            <StarIcon className="h-4 text-yellow-400" />
            <h1 className="font-bold text-center text-xl text-purple-600">
              Services Offered
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => (
              <label
                key={service.id}
                className="flex items-center gap-4 bg-gray-100 p-2 rounded cursor-pointer"
              >
                <input
                  className="h-5 w-5 accent-pink-500"
                  type="checkbox"
                  value={service}
                  checked={selectedServices.includes(service)}
                  onChange={() => handleToggle(service)}
                />
                {service}
              </label>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-customPink text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Services;
