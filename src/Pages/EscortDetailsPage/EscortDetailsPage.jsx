import {
  CheckBadgeIcon,
  FlagIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { differenceInYears } from "date-fns";
import { FaWhatsapp } from "react-icons/fa";
import { BsCake, BsGenderAmbiguous, BsRulers } from "react-icons/bs";
import React, { useEffect, useState, useRef } from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import ProfileTabs from "./ProfileTabs";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useParams } from "react-router";
import Loader from "../../Components/Loaders/Loader";
import { LightbulbIcon } from "lucide-react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Components/ImageSlider/imageslider.css";
import ReportEscort from "../../Components/Escorts/ReportEscort";

const calculateAge = (dob) => {
  if (!dob) return null;
  return differenceInYears(new Date(), new Date(dob));
};

const EscortDetailsPage = () => {
  const { id } = useParams();
  const [escort, setEscort] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEscort = async () => {
    try {
      const response = await axios.get(`${baseUrl}escorts/${id}`);
      setEscort(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchEscort();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    cssEase: "ease",
    swipeToSlide: true,
    variableWidth: false,
    adaptiveHeight: true,
  };

  // handle show modal for report escort
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleViewCounter = async () => {
    try {
      await axios.post(`${baseUrl}view/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleViewCounter();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen ">
          <Loader />
        </div>
      ) : (
        <div className="bg-pink-100 lg:p-4 p-2 fade-in">
          {error && <p className="text-center">{error}</p>}

          <div className="lg:flex bg-[#fff8f9] rounded-lg w-full p-2 lg:pb-5">
            <div className="w-full lg:w-96 mx-auto lg:mx-0 mb-5">
              <Slider ref={sliderRef} {...settings}>
                {Array.isArray(escort.gallery) && escort.gallery.length > 0 ? (
                  escort.gallery.map((img, index) => (
                    <div key={index} className="lg:px-4">
                      <div className="lg:w-[300px] lg:h-[400px] h-[300px]  flex items-center justify-center bg-white rounded-xl">
                        <img
                          className="max-w-full max-h-full object-contain mb-10"
                          src={img}
                          alt={`gallery-${index}`}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-0 w-full">
                    <div className="w-[400px] h-[400px] bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No images</span>
                    </div>
                  </div>
                )}
              </Slider>
            </div>

            {/* RIGHT PANEL: details */}
            <div className="px-3 py-3 w-full lg:w-1/2">
              <div>
                <div className="flex gap-2 items-center">
                  <p className="font-bold text-2xl">{escort?.displayName}</p>
                  <p className="font-bold text-2xl">
                    · {calculateAge(escort?.dob)}
                  </p>
                  <CheckBadgeIcon className="text-blue-500 h-5" />
                </div>

                <div className="flex items-center gap-3 justify-start ">
                  <a
                    className="flex gap-1 items-center mt-2"
                    href={`https://wa.me/${escort?.countryCode}${
                      escort?.phoneNumber
                    }?text=${encodeURIComponent(
                      `Greetings to you ${escort?.displayName}, I found your profound profile on www.oscrovilla.com and wish to find out if you are available for a meetup 💖`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="text-green-500 " />
                    <div className="flex text-blue-700">
                      <p>+{escort?.countryCode}</p>
                      <p>{escort?.phoneNumber}</p>
                    </div>
                  </a>

                  <div className="flex justify-center items-center">
                    <LightbulbIcon className="h-3 lg:h-4 text-customPink" />
                    <p className="lg:text-sm text-[12px] text-gray-500 font-semibold">
                      click phone number to chat directly on WhatsApp
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-3 flex justify-between">
                <div className="flex text-yellow-400">
                  <StarIcon className="h-5" />
                  <StarIcon className="h-5" />
                  <StarIcon className="h-5" />
                  <StarIcon className="h-5" />
                  <StarIcon className="h-5" />
                </div>

                <div className="flex gap-3 items-center">
                  <div className="flex items-center justify-center gap-1 bg-green-200 rounded-xl px-2 py-1">
                    <GiftIcon className="h-5 text-green-500" />{" "}
                    <p className="text-[10px] font-bold text-green-500">Gift</p>
                  </div>
                  <div className="flex items-center justify-center gap-1 bg-pink-200 rounded-xl px-2 py-1">
                    <FlagIcon className="h-5 text-pink-500" />{" "}
                    <p
                      className="text-[10px] font-bold text-pink-500 cursor-pointer"
                      onClick={() => setShowModal(true)}
                    >
                      Report
                    </p>
                    {showModal && (
                      <ReportEscort
                        handleShowModal={handleShowModal}
                        setShowModal={setShowModal}
                        showModal={showModal}
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-1 bg-orange-200 rounded-xl px-2 py-1">
                    <ShareIcon className="h-5 text-orange-500" />
                    <p className="text-[10px] font-bold text-orange-500">
                      Share
                    </p>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="flex text-center justify-between w-3/4 lg:w-2/4 mx-auto py-3">
                  <div>
                    <p className="font-semibold">Posts</p>
                    <p>0</p>
                  </div>
                  <div>
                    <p className="font-semibold">Followers</p>
                    <p>0</p>
                  </div>
                  <div>
                    <p className="font-semibold">Following</p>
                    <p>0</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="italic">{escort?.heading}</p>
                </div>
              </div>

              <div className="lg:mt-10 ">
                <div className="flex lg:w-2/4 lg:gap-3 justify-between  mx-auto py-3">
                  <div className="text-white bg-blue-500 px-5 py-2 rounded-2xl">
                    Follow
                  </div>
                  <div className="text-white bg-orange-500 px-5 py-2 rounded-2xl">
                    Fav
                  </div>
                  <div className="text-white bg-green-500 px-5 py-2 rounded-2xl">
                    Chat
                  </div>
                  <div className="text-white bg-pink-500 px-5 py-2 rounded-2xl">
                    Book
                  </div>
                </div>

                <div className="flex lg:w-2/4 lg:gap-5 mx-auto justify-between w-3/4 items-center">
                  <div className="text-center">
                    <BsGenderAmbiguous className="text-3xl text-pink-500" />
                    <p className="font-semibold">{escort?.gender}</p>
                  </div>
                  <div className="text-center">
                    <BsCake className="text-pink-500 text-3xl" />
                    <p className="font-semibold">{calculateAge(escort?.dob)}</p>
                  </div>
                  <div className="text-center">
                    <BsRulers className="text-2xl text-pink-500" />
                    <p className="font-semibold">{escort?.height}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!error && <ProfileTabs escort={escort} />}
        </div>
      )}
    </>
  );
};

export default EscortDetailsPage;
