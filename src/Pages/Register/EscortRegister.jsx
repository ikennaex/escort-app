import { StarIcon } from "@heroicons/react/24/solid";
import { Country, State, City } from "country-state-city";
import cities from "../../data/cities.json";
import React, { useContext, useState } from "react";
import VerifyEmail from "./VerifyEmail";
import {baseUrl} from "../../baseUrl"
import { UserContext } from "../../Contexts/UserContext";
import Loader from "../../Components/Loaders/Loader";

  // Calculate the latest allowed birthdate (today - 18 years)
  const today = new Date();
  const year = today.getFullYear() - 18;
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const maxDate = `${year}-${month}-${day}`;

const EscortRegister = () => {
  const {api} = useContext(UserContext)
  const [showVerify, setShowVerify] = useState(false);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    displayName: "",
    country: "",
    state: "",
    city: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    heading: "",
  });

  const countries = Country.getAllCountries();
  const states = formData.country ? State.getStatesOfCountry(formData.country) : [];
  const countryCode = formData.country ? countries.find((c) => c.isoCode === formData.country)?.phonecode : "";

  const lgas =
    formData.country && formData.state && cities[formData.country] && cities[formData.country][formData.state]
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
      setLoading(true)
      const response = await api.post(`${baseUrl}auth/escortsignup`, formData)
      setShowVerify(true);
      console.log(response)
      alert(response.data.message)
    } catch (err) {
      console.log(err)
      alert(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-2">
      {showVerify && <VerifyEmail email = {formData.email} onClose={() => setShowVerify(!showVerify)} />}
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
        </div>

        <div>
          <p className="font-bold text-white text-center mt-4"> Step 1/6</p>
        </div>
      </div>

      <div>
        <div>
          <form
            className="bg-pink-100 mt-4 rounded-sm p-4 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center justify-center gap-2">
              <StarIcon className="h-5 text-yellow-400" />
              <h1 className="font-bold text-center text-xl text-purple-600">
                Escort Registration
              </h1>
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="username">
                Username
              </label>
              <input
                placeholder="Enter username"
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                required
              />
              <p className="text-[12px] leading-tight text-gray-400">
                User name is a name that appears on your profile link . It is
                used to identify you, so please do not use your Real name as the
                username is visible to clients too.
              </p>
            </div>
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
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="password">
                Password
              </label>
              <input
                placeholder="Set password"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
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
                required
              />
              <p className="text-[12px] leading-tight text-gray-400">
                Your display name is the primary name visible on your profile to
                others. To protect your privacy, we strongly advise against
                using your real name. Instead, opt for a fun or creative name,
                such as a playful or imaginative nickname. Please note: Once
                your registration is complete, neither your username nor your
                display name can be changed. If you wish to update them later,
                the only option will be to delete your account and create a new
                one. Choose wisely!
              </p>
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="description">
                Country
              </label>
              <select
                onChange={handleChange}
                id="country"
                name="country"
                required
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
              <p className="text-[12px] leading-tight text-gray-400">
                Select the country you have the phone number for. Your country
                selection is tied to your phone number. Eg. You can't be in
                Dubai and use Nigerian phone number. The system will display
                your location as Nigeria. So please if you don't have a local
                number yet, get yourself one before you continue your
                registration.
              </p>
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="description">
                State
              </label>
              <select
                onChange={handleChange}
                id="state"
                name="state"
                required
              >
                <option value="">Select your state</option>
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
              <select
                onChange={handleChange}
                id="city"
                name="city"
                required
              >
                <option value="">Select your city</option>
                {lgas.map((lga, index) => (
                  <option key={index} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="dob">
                Date of Birth
              </label>
              <input onChange={handleChange} type="date" max={maxDate} id="dob" name="dob" required />
              <p className="text-[12px] leading-tight text-gray-400">
                Date of birth cannot be changed after registration.
              </p>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="gender">
                Gender
              </label>
              <select onChange={handleChange} id="gender" name="gender" required>
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <p className="text-[12px] leading-tight text-gray-400">
                Gender cannot be changed after registration.
              </p>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="phoneNumber">
                Phone Number
              </label>

              <div className="flex items-center justify-center">
                <div className="px-1 font-bold">{countryCode ? `+${countryCode}` : "+ "}</div>
              <input
                placeholder="Enter phone number"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleChange}
                required
              />
              </div>
              <p className="text-[12px] leading-tight text-gray-400">
                Your mobile number is determined by your country selection. To
                change your country phone code, first change your country
                selection.birth. It can not be changed once your registration is
                completed.
              </p>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="heading">
                Heading
              </label>
              <textarea
                className="p-2"
                placeholder="In a short sentence, tell your clients what you offer"
                type="text"
                id="heading"
                name="heading"
                rows={7}
                onChange={handleChange}
                required
              />
            </div>
            <button
            disabled = {loading}
              className="bg-customPink text-white py-2 px-4 rounded disabled:bg-customPink/50 mx-auto"
              type="submit"
            >
              {loading? <Loader /> : "Verify Details"}
              
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EscortRegister;
