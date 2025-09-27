import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./imageslider.css";

import {
  CheckBadgeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import Loader from "../Loaders/Loader";
import { isFresh } from "../Escorts/FreshBadge";

const ImageSlider = () => {
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [premiumEscorts, setPremiumEscorts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPremiumEscorts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}escorts/premium`);
      console.log(response);
      setPremiumEscorts(response.data.escortDoc);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPremiumEscorts();
  }, []);

  // Force correct slidesToShow on real devices
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1024) setSlidesToShow(3);
      else if (w >= 640) setSlidesToShow(2);
      else setSlidesToShow(1);
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024, // screens <= 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 640, // screens <= 640px (mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "70px",
        },
      },
    ],
  };

  console.log(premiumEscorts);

  return (
    <div className="w-full mx-auto p-1 ">
      {loading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      <Slider key={slidesToShow} {...settings}>
        {premiumEscorts?.map((item, index) => (
          <div key={index} className="px-2 w-full max-w-sm mx-auto">
            <Link to={`/escorts/${item.user._id}`}>
              <div className="w-full border-2 border-white overflow-hidden relative">
                <img
                  className="w-full h-96 object-cover object-top"
                  src={item.user.gallery?.[0]}
                  alt={item.user.displayName}
                />

                {/* Transparent content area */}
                <div className="absolute bottom-0 left-0 right-0 bg-pink-950/70 text-white p-4">
                  {/* Name */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-lg">
                        {item.user.displayName}
                      </p>
                      <CheckBadgeIcon className="text-green-500 h-5" />
                    </div>
                    <HeartIcon className="h-5 text-red-500 justify-end" />
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2 mb-2">
                    <PhoneIcon className="h-5 text-customPink" />
                    <a
                      href={`tel:${item.user.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.user.phoneNumber}
                    </a>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPinIcon className="h-5 text-customPink" />
                    <p className="text-sm">
                      {item.user.city +
                        ", " +
                        item.user.state +
                        ", " +
                        item.user.country}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-tight">
                    {item.user.heading?.split(" ").slice(0, 5).join(" ")}
                    {item.user.heading?.split(" ").length > 20 ? "..." : ""}
                  </p>
                </div>
                {isFresh(item.createdAt) && (
                  <div className="absolute top-3 right-[-40px] w-40 bg-yellow-500 text-white text-center text-xs font-bold py-1 transform rotate-45 shadow-lg drop-shadow-xl">
                    Fresh
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
