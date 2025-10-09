import React, { useContext } from "react";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import ClientNotice from "../../Components/ClientNotice/ClientNotice";
import Escorts from "../../Components/Escorts/Escorts";
import IncompleteRegistration from "../../Components/IncompleteRegistration/IncompleteRegistration";
import { UserContext } from "../../Contexts/UserContext";

const Homepage = () => {
  const {user} = useContext(UserContext);
  return (
    <div className="my-2">
      {user && !user?.registrationComplete &&
      <IncompleteRegistration />
      }

      <ImageSlider />
      <ClientNotice />
      <Escorts />
    </div>
  );
};

export default Homepage;
