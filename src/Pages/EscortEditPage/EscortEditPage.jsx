import { StarIcon } from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseUrl } from "../../baseUrl";
import { UserContext } from "../../Contexts/UserContext";
import Loader from "../../Components/Loaders/Loader";
import services from "../../data/services.json";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

const EscortEditPage = () => {
  const navigate = useNavigate();
  const { api } = useContext(UserContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [fetchedUser, setfetchedUser] = useState();
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    heading: "",
    education: "",
    about: "",
    occupation: "",
    weight: "",
    smoker: "",
    services: "",
    shorttimeIncall: "",
    shorttimeOutcall: "",
    overnightIncall: "",
    overnightOutcall: "",
    weekendIncall: "",
    weekendOutcall: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      // sending final data because it appends countryCode
      const response = await api.get(`${baseUrl}escorts/${id}`);
      setFormData({
        email: response.data.email,
        displayName: response.data.displayName,
        heading: response.data.heading,
        education: response.data.education,
        about: response.data.about,
        occupation: response.data.occupation,
        weight: response.data.weight,
        smoker: response.data.smoker,
        services: response.data.services,
        shorttimeIncall: response.data.shorttimeIncall,
        shorttimeOutcall: response.data.shorttimeOutcall,
        overnightIncall: response.data.overnightIncall,
        overnightOutcall: response.data.overnightOutcall,
        weekendIncall: response.data.weekendIncall,
        weekendOutcall: response.data.weekendOutcall,

      });
      console.log(response.data);
      console.log(formData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices.length < 5) {
      toast.error("Please select at least 5 services before continuing.", {
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await api.patch(`${baseUrl}escorts/edit`, formData);
      console.log(response);
      toast.success(response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
      navigate(`/escortdashboard/${user._id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="bg-pink-100 mt-4 rounded-sm p-4 flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center gap-2">
          <StarIcon className="h-5 text-yellow-400" />
          <h1 className="font-bold text-center text-xl text-purple-600">
            Escort Details
          </h1>
        </div>
        <div className="flex flex-col"></div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input
            placeholder="Enter email"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData?.email}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Heading</label>
          <input
            placeholder="Edit heading"
            type="text"
            id="heading"
            name="heading"
            onChange={handleChange}
            value={formData?.heading}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="displayName">
            Display Name
          </label>
          <input
            placeholder="Enter display name"
            type="text"
            id="displayName"
            name="displayName"
            onChange={handleChange}
            value={formData?.displayName}
            required
          />
        </div>

        <div>
          <label className="font-bold" htmlFor="education">
            Education
          </label>
          <select
            onChange={handleChange}
            name="education"
            id="education"
            required
            value={formData?.education}
          >
            <option value="">Select your education level</option>
            <option value="Primary School">Primary School</option>
            <option value="High School">High School</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        <div>
          <label className="font-bold" htmlFor="about">
            About
          </label>
          <textarea
            onChange={handleChange}
            name="about"
            id="about"
            rows="4"
            placeholder="Tell us about yourself"
            required
            value={formData?.about}
          ></textarea>
        </div>

        <div>
          <label className="font-bold" htmlFor="occupation">
            Occupation
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="occupation"
            id="occupation"
            placeholder="Your occupation"
            required
            value={formData?.occupation}
          />
        </div>

        <div>
          <label className="font-bold" htmlFor="weight">
            Weight
          </label>
          <select
            onChange={handleChange}
            name="weight"
            id="weight"
            required
            value={formData?.weight}
          >
            <option value="">Select your weight</option>
            <option value="Underweight">Underweight</option>
            <option value="Normal">Normal</option>
            <option value="Overweight">Overweight</option>
          </select>
        </div>

        <div>
          <label className="font-bold" htmlFor="smoker">
            Smoker
          </label>
          <select
            onChange={handleChange}
            name="smoker"
            id="smoker"
            required
            value={formData?.smoker}
          >
            <option value="">Select your smoking status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

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
                value={formData?.services}
                checked={selectedServices.includes(service)}
                onChange={() => handleToggle(service)}
              />
              {service}
            </label>
          ))}
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
              value={formData.shortimeIncall}
            >
              <option value="">Select your short time rate</option>
              <option value="10000">10,000</option>
              <option value="20000">20,000</option>
              <option value="30000">30,000</option>
              <option value="40000">40,000</option>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
              <option value="80000">80,000</option>
              <option value="90000">90,000</option>
              <option value="100000">100,000</option>
              <option value="120000">120,000</option>
            </select>

            <label htmlFor="overnightIncall">Overnight</label>
            <select
              onChange={handleChange}
              id="overnightIncall"
              name="overnightIncall"
              required
              value={formData.overnightIncall}
            >
              <option value="">Select your overnight rate</option>
              <option value="10000">10,000</option>
              <option value="20000">20,000</option>
              <option value="30000">30,000</option>
              <option value="40000">40,000</option>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
              <option value="80000">80,000</option>
              <option value="90000">90,000</option>
              <option value="100000">100,000</option>
              <option value="120000">120,000</option>
            </select>

            <label htmlFor="weekendIncall">Weekend</label>
            <select
              onChange={handleChange}
              id="weekendIncall"
              name="weekendIncall"
              required
              value={formData.weekendIncall}
            >
              <option value="">Select your weekend rate</option>
              <option value="10000">10,000</option>
              <option value="20000">20,000</option>
              <option value="30000">30,000</option>
              <option value="40000">40,000</option>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
              <option value="80000">80,000</option>
              <option value="90000">90,000</option>
              <option value="100000">100,000</option>
              <option value="120000">120,000</option>
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
              value={formData.shortimeOutcall}
            >
              <option value="">Select your short time rate</option>
              <option value="10000">10,000</option>
              <option value="20000">20,000</option>
              <option value="30000">30,000</option>
              <option value="40000">40,000</option>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
              <option value="80000">80,000</option>
              <option value="90000">90,000</option>
              <option value="100000">100,000</option>
              <option value="120000">120,000</option>
            </select>

            <label htmlFor="overnightOutcall">Overnight</label>
            <select
              onChange={handleChange}
              id="overnightOutcall"
              name="overnightOutcall"
              required
              value={formData.overnightOutcall}
            >
              <option value="">Select your overnight rate</option>
              <option value="10000">10,000</option>
              <option value="20000">20,000</option>
              <option value="30000">30,000</option>
              <option value="40000">40,000</option>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
              <option value="80000">80,000</option>
              <option value="90000">90,000</option>
              <option value="100000">100,000</option>
              <option value="120000">120,000</option>
            </select>

            <label htmlFor="weekendOutcall">Weekend</label>
            <select
              onChange={handleChange}
              id="weekendOutcall"
              name="weekendOutcall"
              required
              value={formData.weekendOutcall}
            >
              <option value="">Select your weekend rate</option>
              <option value="10000">10,000</option>
              <option value="20000">20,000</option>
              <option value="30000">30,000</option>
              <option value="40000">40,000</option>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
              <option value="80000">80,000</option>
              <option value="90000">90,000</option>
              <option value="100000">100,000</option>
              <option value="120000">120,000</option>
            </select>
          </div>

        <button
          disabled={loading}
          className="bg-customPink text-white py-2 px-4 rounded disabled:bg-customPink/50 mx-auto"
          type="submit"
        >
          {loading ? <Loader /> : "Edit Details"}
        </button>
      </form>
    </div>
  );
};

export default EscortEditPage;
