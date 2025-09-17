import React, { useContext, useEffect, useState } from "react";
import services from "../../../data/services.json";
import { PlusCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
import { UserContext } from "../../../Contexts/UserContext";
import Loader from "../../../Components/Loaders/Loader";
import { FormContext } from "../../../Contexts/FormContext";
import { ToastContainer, toast } from 'react-toastify';

const Services = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const { api } = useContext(UserContext);
  const { markStepCompleted, completedSteps } = useContext(FormContext);

  useEffect(() => {
    if (!completedSteps.includes(2)) {
      navigate("/escort-details");
    }
  }, [completedSteps, navigate]);

  const handleToggle = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices.length < 5) {
      toast.success("Please select at least 5 services before continuing.", {
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await api.put("escortservices", {
        services: selectedServices,
      });
      toast.success(response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
      markStepCompleted(2);
      navigate("/escort-rates");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }

    // Continue with form submission
    console.log("Selected services:", selectedServices);
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
              Services Offered - Select at LEAST 5
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {services.map((service, index) => (
              <label
                key={index}
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
            disabled={selectedServices.length < 5}
            className="mt-4 bg-customPink text-white py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-customPink/50 mx-auto"
          >
            {loading ? <Loader /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Services;
