import { useState } from "react";
import { ChevronsRightLeft, X } from "lucide-react";
import { Country, State, City } from "country-state-city";
import cities from "../../data/cities.json";
import services from "../../data/services.json";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import { useNavigate } from "react-router";

const FilterBox = ({ open, handlePopUp }) => {
  const navigate = useNavigate()
  const [filteredEscorts, setFilteredEscorts] = useState("");
  const [filters, setFilters] = useState({
    displayName: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    minAge: "",
    maxAge: "",
    ethnicity: "",
    bustSize: "",
    bodyBuild: "",
    looks: "",
    sexualOrientation: "",
    availability: "",
    smoker: "",
    services: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const countries = Country.getAllCountries();

    // this is to select specific countries only
  const targetNames = ["Nigeria", "Ghana"];

  const selectedCountries = countries.filter((country) =>
    targetNames.includes(country.name)
  );


  const states = filters.country
    ? State.getStatesOfCountry(filters.country)
    : [];

  const lgas =
    filters.country &&
    filters.state &&
    cities[filters.country] &&
    cities[filters.country][filters.state]
      ? cities[filters.country][filters.state]
      : [];

  const toggleService = (service) => {
    setFilters((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleFilter = async () => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await axios.get(`${baseUrl}escorts/search?${queryString}`)
      console.log(response)
      setFilteredEscorts(response.data);
      handlePopUp()
      navigate(`/search?${queryString}`)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-pink-100 w-[90%] md:w-[70%] lg:w-[60%] max-h-[85vh] overflow-y-auto rounded-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={handlePopUp}
              className="absolute top-3 right-3 text-black hover:text-black"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">
              Search for Escorts
            </h2>

            {/* Filter Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Escort Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="displayName"
                  className="font-semibold text-gray-800"
                >
                  Escort Name
                </label>
                <input
                  name="displayName"
                  type="text"
                  placeholder="Type Escort name"
                  className="border rounded-lg p-2 mt-1"
                  onChange={handleChange}
                />
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="font-semibold text-gray-800"
                >
                  Country
                </label>
                <select
                  onChange={handleChange}
                  id="country"
                  name="country"
                  className="border rounded-lg p-2 mt-1"
                  required
                >
                  <option value="">Select a country</option>
                  {selectedCountries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className="flex flex-col">
                <label htmlFor="state" className="font-semibold text-gray-800">
                  State
                </label>
                <select
                  onChange={handleChange}
                  id="state"
                  name="state"
                  className="border rounded-lg p-2 mt-1"
                  required
                >
                  <option value="">
                    {filters.country
                      ? "Select a State"
                      : "Select a Country first"}
                  </option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="flex flex-col">
                <label htmlFor="city" className="font-semibold text-gray-800">
                  City
                </label>
                <select
                  onChange={handleChange}
                  id="city"
                  name="city"
                  className="border rounded-lg p-2 mt-1"
                  required
                >
                  <option value="">
                    {filters.state ? "Select a City" : "Select a State first"}
                  </option>
                  {lgas.map((lga, index) => (
                    <option key={index} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <label htmlFor="gender" className="font-semibold text-gray-800">
                  Gender
                </label>
                <select
                  name="gender"
                  className="border rounded-lg p-2 mt-1"
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="both">Both</option>
                </select>
              </div>

              {/* Age */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-800">Age Range</label>
                <div className="flex gap-2">
                  <input
                    name="minAge"
                    type="number"
                    placeholder="From"
                    className="border rounded-lg p-2 mt-1 w-1/2"
                    onChange={handleChange}
                  />
                  <input
                    name="maxAge"
                    type="number"
                    placeholder="To"
                    className="border rounded-lg p-2 mt-1 w-1/2"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Ethnicity */}
              <div className="flex flex-col">
                <label
                  htmlFor="ethnicity"
                  className="font-semibold text-gray-800"
                >
                  Ethnicity
                </label>
                <select
                  onChange={handleChange}
                  name="ethnicity"
                  id="ethnicity"
                  className="border rounded-lg p-2 mt-1"
                  required
                >
                  <option value="">Select ethnicity</option>
                  <option value="Asian">Asian</option>
                  <option value="Black">Black</option>
                  <option value="Hispanic">Hispanic</option>
                  <option value="White">White</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Bust Size */}
              <div className="flex flex-col">
                <label
                  htmlFor="bustSize"
                  className="font-semibold text-gray-800"
                >
                  Bust Size
                </label>
                <select
                  onChange={handleChange}
                  name="bustSize"
                  id="bustSize"
                  className="border rounded-lg p-2 mt-1"
                >
                  <option value="">Select size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                </select>
              </div>

              {/* Body Build */}
              <div className="flex flex-col">
                <label
                  htmlFor="bodyBuild"
                  className="font-semibold text-gray-800"
                >
                  Body Build
                </label>
                <select
                  onChange={handleChange}
                  name="bodyBuild"
                  id="bodyBuild"
                  className="border rounded-lg p-2 mt-1"
                >
                  <option value="">Select build</option>
                  <option value="Slim">Slim</option>
                  <option value="Average">Average</option>
                  <option value="Athletic">Athletic</option>
                  <option value="Curvy">Curvy</option>
                </select>
              </div>

              {/* Looks */}
              <div className="flex flex-col">
                <label htmlFor="looks" className="font-semibold text-gray-800">
                  Looks
                </label>
                <select
                  onChange={handleChange}
                  name="looks"
                  id="looks"
                  className="border rounded-lg p-2 mt-1"
                >
                  <option value="">Select looks</option>
                  <option value="Attractive">Attractive</option>
                  <option value="Average">Average</option>
                  <option value="Below average">Below Average</option>
                </select>
              </div>

              {/* Sexual Orientation */}
              <div className="flex flex-col">
                <label
                  htmlFor="sexualOrientation"
                  className="font-semibold text-gray-800"
                >
                  Sexual Orientation
                </label>
                <select
                  onChange={handleChange}
                  name="sexualOrientation"
                  id="sexualOrientation"
                  className="border rounded-lg p-2 mt-1"
                >
                  <option value="">Select orientation</option>
                  <option value="Heterosexual">Heterosexual</option>
                  <option value="Homosexual">Homosexual</option>
                  <option value="Bisexual">Bisexual</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Availability */}
              {/* <div className="flex flex-col">
                <label
                  htmlFor="availability"
                  className="font-semibold text-gray-800"
                >
                  Availability
                </label>
                <select
                  name="availability"
                  className="border rounded-lg p-2 mt-1"
                  onChange={handleChange}
                >
                  <option value="">Select availability</option>
                  <option value="Incall">Incall</option>
                  <option value="Outcall">Outcall</option>
                </select>
              </div> */}

              {/* Smoker */}
              <div className="flex flex-col">
                <label htmlFor="smoker" className="font-semibold text-gray-800">
                  Smoker
                </label>
                <select
                  name="smoker"
                  className="border rounded-lg p-2 mt-1"
                  onChange={handleChange}
                >
                  <option value="">Select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            {/* Services */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto border rounded-lg p-3 bg-white">
                {services.map((service) => (
                  <label key={service} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.services.includes(service)}
                      onChange={() => toggleService(service)}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setFilters({ ...filters, services: [] })}
              >
                Reset
              </button>
              <button
                className="px-4 py-2 bg-customPink text-white rounded-lg hover:bg-pink-600 transition"
                onClick={handleFilter}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBox;
