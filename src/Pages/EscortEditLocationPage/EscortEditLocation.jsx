import { Country, State, City } from "country-state-city";
import cities from "../../data/cities.json";
import React, { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router";
import Loader from "../../Components/Loaders/Loader";

const EscortEditLocation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { api } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
  });

  const countries = Country?.getAllCountries();
  // this is to select specific countries only
  const targetNames = ["Nigeria", "Ghana"];

  const selectedCountries = countries.filter((country) =>
    targetNames.includes(country.name)
  );

  const states = formData.country
    ? State.getStatesOfCountry(formData.country)
    : [];
  //   const countryCode = formData.country
  //     ? countries.find((c) => c.isoCode === formData.country)?.phonecode
  //     : "";

  const lgas =
    formData.country &&
    formData.state &&
    cities[formData.country] &&
    cities[formData.country][formData.state]
      ? cities[formData.country][formData.state]
      : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
      const response = await api.patch("/escorts/edit/location", formData);
      alert(response.data.message);
      navigate(`/escorts/${user._id}`);
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert(err.response?.data?.message || "Could not update location");
    } finally {
        setLoading(false);
    }
  };

  console.log(formData);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-pink-100 mt-4 rounded-sm p-4 flex flex-col gap-2 h-lvh"
        action=""
      >
        <p className="font-bold text-center text-xl text-purple-600">
          Edit location
        </p>

        <div>
            <p className="font-semibold">Your current location details</p>
            <p >Country: <span>{user?.country || "—"}</span></p>
            <p>State: <span>{user?.state || "—"}</span></p>
            <p>City: <span>{user?.city || "—"}</span></p>
        </div>

        <div className="flex flex-col">
          <label className="font-bold" htmlFor="country">
            Country
          </label>
          <select onChange={handleChange} id="country" name="country" required>
            <option value="">Select your country</option>
            {selectedCountries?.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
          <p className="text-[12px] leading-tight text-gray-400">
            Note: Selecting your country will update the state and city options
          </p>
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="description">
            State
          </label>
          <select onChange={handleChange} id="state" name="state" required>
            <option value="">Select your new state</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="description">
            City
          </label>
          <select onChange={handleChange} id="city" name="city" required>
            <option value="">Select your new city</option>
            {lgas.map((lga, index) => (
              <option key={index} value={lga}>
                {lga}
              </option>
            ))}
          </select>
        </div>

        <button disabled={loading} className="bg-customPink mx-auto py-3">{loading ? <Loader/> : "Update Location"}</button>
      </form>
    </div>
  );
};

export default EscortEditLocation;
