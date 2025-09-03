import { StarIcon } from "@heroicons/react/24/solid";
import { Country, State, City } from "country-state-city";
import cities from "../../cities.json";
import React, { useState } from "react";

const EscortRegister = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const countries = Country.getAllCountries();
  const states = country ? State.getStatesOfCountry(country) : [];
  console.log(state)

  const lgas =
    country && state && cities[country] && cities[country][state]
      ? cities[country][state]
      : [];

  return (
    <div className="p-2">
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
            action=""
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
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="display-name">
                Display Name
              </label>
              <input
                placeholder="Enter display name"
                type="text"
                id="display-name"
                name="display-name"
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
                onChange={(e) => setCountry(e.target.value)}
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
                onChange={(e) => setState(e.target.value)}
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
                onChange={(e) => setCity(e.target.value)}
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
              <input type="date" id="dob" name="dob" required />
              <p className="text-[12px] leading-tight text-gray-400">
                Date of birth cannot be changed after registration.
              </p>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="gender">
                Gender
              </label>
              <select id="gender" name="gender" required>
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <p className="text-[12px] leading-tight text-gray-400">
                Gender cannot be changed after registration.
              </p>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="phone">
                Phone Number
              </label>
              <input
                placeholder="Enter phone number"
                type="tel"
                id="phone"
                name="phone"
                required
              />
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
                required
              />
            </div>
            <button
              className="bg-customPink text-white py-2 px-4 rounded"
              type="submit"
            >
              Verify Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EscortRegister;
