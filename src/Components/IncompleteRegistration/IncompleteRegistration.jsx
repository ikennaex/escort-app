import React, { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router";

const IncompleteRegistration = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  console.log("User in IncompleteRegistration:", user.registrationStep);

    const handleRedirect = () => {
    switch (user?.registrationStep) {
      case "additionalDetails":
        navigate("/escort-details");
        break;
      case "services":
        navigate("/escort-services");
        break;
      case "rates":
        navigate("/escort-rates");
        break;
      case "gallery":
        navigate("/escort-gallery");
        break;
      case "verification":
        navigate("/escort-verification");
        break;
      default:
        navigate("/register");
        break;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm md:text-base px-4 py-3 rounded-md my-3 mx-auto max-w-xl shadow-sm">
      <p className="text-center sm:text-left">
        You are yet to complete your registration. Please complete your profile
        to access all features.
      </p>

      <button
        onClick={handleRedirect}
        className="bg-customPink text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-all"
      >
        Continue Registration
      </button>
    </div>
  );
};

export default IncompleteRegistration;
