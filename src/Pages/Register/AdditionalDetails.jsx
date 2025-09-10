import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../Contexts/UserContext";
import Loader from "../../Components/Loaders/Loader";

const AdditionalDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const {api} = useContext(UserContext)
  const [formData, setFormData] = useState({
    education: "",
    about: "",
    occupation: "",
    ethnicity: "",
    bustSize: "",
    height: "",
    weight: "",
    bodyBuild: "",
    looks: "",
    smoker: "",
    sexualOrientation: "",
    incallAvailable: "",
    outcallAvailable: "",
  });

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
      // api from usecontext
      const response = await api.put("/escortdetails", formData)
      console.log(response)
      alert(response.data.message)
      navigate("/escort-services");
    } catch (err) {
      console.log(err)
      alert(err.response.data.mesaage)
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className="p-2">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-yellow-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
          <div className="h-1 w-full rounded-full bg-gray-400"></div>
        </div>

        <div>
          <p className="font-bold text-white text-center mt-4"> Step 2/6</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-pink-100 mt-4 rounded-sm p-4 flex flex-col gap-2"
        >
          <div className="flex items-center justify-center gap-2">
            <PlusCircleIcon className="h-4 text-yellow-400" />
            <h1 className="font-bold text-center text-xl text-purple-600">
              Additional Details
            </h1>
          </div>

          <div>
            <label className="font-bold" htmlFor="education">
              Education
            </label>
            <select onChange={handleChange} name="education" id="education" required>
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
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="ethnicity">
              Ethnicity
            </label>
            <select onChange={handleChange} name="ethnicity" id="ethnicity" required>
              <option value="">Select your ethnicity</option>
              <option value="Asian">Asian</option>
              <option value="Black">Black</option>
              <option value="Hispanic">Hispanic</option>
              <option value="White">White</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="bustSize">
              Bust Size
            </label>
            <select onChange={handleChange} name="bustSize" id="bustSize" required>
              <option value="">Select your bust size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="height">
              Height
            </label>
            <select onChange={handleChange} name="height" id="height" required>
              <option value="">Select your height</option>
              <option value="Short">Short</option>
              <option value="Average">Average</option>
              <option value="Tall">Tall</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="weight">
              Weight
            </label>
            <select onChange={handleChange} name="weight" id="weight" required>
              <option value="">Select your weight</option>
              <option value="Underweight">Underweight</option>
              <option value="Normal">Normal</option>
              <option value="Overweight">Overweight</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="bodyBuild">
              Body Build
            </label>
            <select onChange={handleChange} name="bodyBuild" id="bodyBuild" required>
              <option value="">Select your body build</option>
              <option value="Slim">Slim</option>
              <option value="Average">Average</option>
              <option value="Athletic">Athletic</option>
              <option value="Curvy">Curvy</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="looks">
              Looks
            </label>
            <select onChange={handleChange} name="looks" id="looks" required>
              <option value="">Select your looks</option>
              <option value="Attractive">Attractive</option>
              <option value="Average">Average</option>
              <option value="Below average">Below Average</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="smoker">
              Smoker
            </label>
            <select onChange={handleChange} name="smoker" id="smoker" required>
              <option value="">Select your smoking status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div> 

          <div>
            <label className="font-bold" htmlFor="sexualOrientation">
              Sexual Orientation
            </label>
            <select onChange={handleChange} name="sexualOrientation" id="sexualOrientation" required>
              <option value="">Select your sexual orientation</option>
              <option value="Heterosexual">Heterosexual</option>
              <option value="Homosexual">Homosexual</option>
              <option value="Bisexual">Bisexual</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="incallAvailable">
              Availability for Incall
            </label>
            <div>
              <select onChange={handleChange}
                name="incallAvailable"
                id="incallAvailable"
                required
              >
                <option value="">Select your availability</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold" htmlFor="outcallAvailable">
              Availability for Outcall
            </label>
            <div>
              <select onChange={handleChange}
                name="outcallAvailable"
                id="outcallAvailable"
                required
              >
                <option value="">Select your availability</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold" htmlFor="language-spoken">
              Language Spoken
            </label>
            <div>
              <select onChange={handleChange} name="language-spoken" id="language-spoken" required>
                <option value="">Select your language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>

          <button
          disabled = {loading}
            className="bg-customPink text-white py-2 my-2 px-4 rounded mx-auto disabled:bg-customPink/50"
            type="submit"
          >
            {loading? <Loader /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdditionalDetails;
