import React, { useContext, useEffect, useState } from "react";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import ClientNotice from "../../Components/ClientNotice/ClientNotice";
import Escorts from "../../Components/Escorts/Escorts";
import IncompleteRegistration from "../../Components/IncompleteRegistration/IncompleteRegistration";
import { UserContext } from "../../Contexts/UserContext";

const Homepage = () => {
  const { user } = useContext(UserContext);
  const[showIncomplete, setShowIncomplete] = useState(false);

  useEffect(() => {
    // Only run timeout when user is available
    if (user) {
      const timer = setTimeout(() => {
        if (!user.registrationComplete) {
          setShowIncomplete(true);
        }
      }, 2000);

      // Cleanup timeout when component unmounts or user changes
      return () => clearTimeout(timer);
    }
  }, [user]);

  console.log(user)

  return (
    <div className="my-2">
      {showIncomplete && user?.role === "Escort" && <IncompleteRegistration />}

      <ImageSlider />
      <ClientNotice />
      <Escorts />
    </div>
  );
};

export default Homepage;
