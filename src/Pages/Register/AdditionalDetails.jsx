import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useNavigate } from "react-router";

const AdditionalDetails = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/escort-services');
    }
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

        <form onSubmit={handleSubmit} className="bg-pink-100 mt-4 rounded-sm p-4 flex flex-col gap-2">
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
            <select name="education" id="education" required>
              <option value="">Select your education level</option>
              <option value="primaryschool">Primary School</option>
              <option value="highschool">High School</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="about">About</label>
            <textarea name="about" id="about" rows="4" placeholder="Tell us about yourself" required></textarea>
          </div>

          <div>
            <label className="font-bold" htmlFor="occupation">Occupation</label>
            <input type="text" name="occupation" id="occupation" placeholder="Your occupation" required />
          </div>

          <div>
            <label className="font-bold" htmlFor="ethnicity">Ethnicity</label>
            <select name="ethnicity" id="ethnicity" required>
              <option value="">Select your ethnicity</option>
              <option value="asian">Asian</option>
              <option value="black">Black</option>
              <option value="hispanic">Hispanic</option>
              <option value="white">White</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="bustsize">Bust Size</label>
            <select name="bustsize" id="bustsize" required>
              <option value="">Select your bust size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra Large</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="height">Height</label>
            <select name="height" id="height" required>
              <option value="">Select your height</option>
              <option value="short">Short</option>
              <option value="average">Average</option>
              <option value="tall">Tall</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="weight">Weight</label>
            <select name="weight" id="weight" required>
              <option value="">Select your weight</option>
              <option value="underweight">Underweight</option>
              <option value="normal">Normal</option>
              <option value="overweight">Overweight</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="build">Body Build</label>
            <select name="build" id="build" required>
              <option value="">Select your body build</option>
              <option value="slim">Slim</option>
              <option value="average">Average</option>
              <option value="athletic">Athletic</option>
              <option value="curvy">Curvy</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="looks">Looks</label>
            <select name="looks" id="looks" required>
              <option value="">Select your looks</option>
              <option value="attractive">Attractive</option>
              <option value="average">Average</option>
              <option value="below-average">Below Average</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="smoker">Smoker</label>
            <select name="smoker" id="smoker" required>
              <option value="">Select your smoking status</option>
              <option value="smoker">Smoker</option>
              <option value="non-smoker">Non-Smoker</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="sexualorientation">Sexual Orientation</label>
            <select name="sexual" id="sexual" required>
              <option value="">Select your sexual orientation</option>
              <option value="heterosexual">Heterosexual</option>
              <option value="homosexual">Homosexual</option>
              <option value="bisexual">Bisexual</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="incall-availability">Availability for Incall</label>
            <div>
                <select name="incall-availability" id="incall-availability" required>
                    <option value="">Select your availability</option>
                    <option value="available">Available</option>
                    <option value="not-available">Not Available</option>
                </select>
            </div>
          </div>

          <div>
            <label className="font-bold" htmlFor="outcall-availability">Availability for Outcall</label>
            <div>
                <select name="outcall-availability" id="outcall-availability" required>
                    <option value="">Select your availability</option>
                    <option value="available">Available</option>
                    <option value="not-available">Not Available</option>
                </select>
            </div>
          </div>

          <div>
            <label className="font-bold" htmlFor="language-spoken">Language Spoken</label>
            <div>
                <select name="language-spoken" id="language-spoken" required>
                    <option value="">Select your language</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                </select>
            </div>
          </div>

          <button className="bg-customPink text-white py-2 my-2 px-4 rounded" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AdditionalDetails;
