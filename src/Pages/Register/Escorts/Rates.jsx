import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../Contexts/UserContext";
import Loader from "../../../Components/Loaders/Loader";
import { FormContext } from "../../../Contexts/FormContext";
import { ToastContainer, toast } from "react-toastify";

const Rates = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { api } = useContext(UserContext);
  const [formData, setFormData] = useState({
    shortimeIncall: "",
    overnightIncall: "",
    weekendIncall: "",
    shortimeOutcall: "",
    overnightOutcall: "",
    weekendOutcall: "",
  });
  const { markStepCompleted, completedSteps } = useContext(FormContext);

  useEffect(() => {
    if (!completedSteps.includes(2)) {
      navigate("/escort-services");
    }
  }, [completedSteps, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    try {
      setLoading(true);
      const response = await api.put("escortrates", formData);
      markStepCompleted(3);
      navigate("/escort-gallery");
      toast.success(response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
        </div>

        <div>
          <p className="font-bold text-white text-center mt-4"> Step 4/6</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-pink-100 mt-4 rounded-sm p-4 flex flex-col gap-2"
        >
          <div className="flex items-center justify-center gap-2">
            <PlusCircleIcon className="h-4 text-yellow-400" />
            <h1 className="font-bold text-center text-xl text-purple-600">
              Rates
            </h1>
          </div>

          <div>
            <p className="font-bold" htmlFor="incall-rate">
              Incall Rate
            </p>

            <label htmlFor="shortimeIncall">Short time</label>
            <select
              onChange={handleChange}
              id="shortimeIncall"
              name="shortimeIncall"
              required
            >
              <option value="">Select your short time rate</option>
              {/* this created an array of numbers from  10,000 to 120,000, intervals of 5000  */}
              {Array.from({ length: (120000 - 10000) / 5000 + 1 }, (_, i) => {
                const value = 10000 + i * 5000;
                return (
                  <option key={value} value={value}>
                    {value.toLocaleString()}
                  </option>
                );
              })}
            </select>

            <label htmlFor="overnightIncall">Overnight</label>
            <select
              onChange={handleChange}
              id="overnightIncall"
              name="overnightIncall"
              required
            >
              <option value="">Select your overnight rate</option>
              {/* this created an array of numbers from  10,000 to 120,000, intervals of 5000  */}
              {Array.from({ length: (250000 - 10000) / 5000 + 1 }, (_, i) => {
                const value = 10000 + i * 5000;
                return (
                  <option key={value} value={value}>
                    {value.toLocaleString()}
                  </option>
                );
              })}
            </select>

            <label htmlFor="weekendIncall">Weekend</label>
            <select
              onChange={handleChange}
              id="weekendIncall"
              name="weekendIncall"
              required
            >
              <option value="">Select your weekend rate</option>
              {/* this created an array of numbers from  10,000 to 120,000, intervals of 5000  */}
              {Array.from({ length: (550000 - 10000) / 5000 + 1 }, (_, i) => {
                const value = 10000 + i * 5000;
                return (
                  <option key={value} value={value}>
                    {value.toLocaleString()}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mt-8">
            <p className="font-bold" htmlFor="outcall-rate">
              Outcall Rate
            </p>

            <label htmlFor="shortimeOutcall">Short time</label>
            <select
              onChange={handleChange}
              id="shortimeOutcall"
              name="shortimeOutcall"
              required
            >
              <option value="">Select your short time rate</option>
              {/* this created an array of numbers from  10,000 to 120,000, intervals of 5000  */}
              {Array.from({ length: (120000 - 10000) / 5000 + 1 }, (_, i) => {
                const value = 10000 + i * 5000;
                return (
                  <option key={value} value={value}>
                    {value.toLocaleString()}
                  </option>
                );
              })}
            </select>

            <label htmlFor="overnightOutcall">Overnight</label>
            <select
              onChange={handleChange}
              id="overnightOutcall"
              name="overnightOutcall"
              required
            >
              <option value="">Select your overnight rate</option>
              {/* this created an array of numbers from  10,000 to 120,000, intervals of 5000  */}
              {Array.from({ length: (250000 - 10000) / 5000 + 1 }, (_, i) => {
                const value = 10000 + i * 5000;
                return (
                  <option key={value} value={value}>
                    {value.toLocaleString()}
                  </option>
                );
              })}
            </select>

            <label htmlFor="weekendOutcall">Weekend</label>
            <select
              onChange={handleChange}
              id="weekendOutcall"
              name="weekendOutcall"
              required
            >
              <option value="">Select your weekend rate</option>
              {/* this created an array of numbers from  10,000 to 120,000, intervals of 5000  */}
              {Array.from({ length: (550000 - 10000) / 5000 + 1 }, (_, i) => {
                const value = 10000 + i * 5000;
                return (
                  <option key={value} value={value}>
                    {value.toLocaleString()}
                  </option>
                );
              })}s
            </select>
          </div>

          <button
            disabled={loading}
            className="bg-customPink text-white py-2 my-2 px-4 rounded mx-auto disabled:bg-customPink/50"
            type="submit"
          >
            {loading ? <Loader /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rates;
