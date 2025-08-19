import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./imageslider.css"

import {
  CheckBadgeIcon,
    MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

import { HeartIcon } from "@heroicons/react/24/outline";


const data = [
  {
    id: 1,
    name: "Stella",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2apztSw2a9Nzw3jedprGNLItfXNrf2jI_cw&s",
    phone: "+234 705 333 3484",
    location: "Ikeja, Lagos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ullam expedita ducimus animi fugit facilis sit repellat hic nemo ipsa?",
  },

  {
    id: 2,
    name: "Mercy",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2apztSw2a9Nzw3jedprGNLItfXNrf2jI_cw&s",
    phone: "+234 705 333 3484",
    location: "Magodo, Lagos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ullam expedita ducimus animi fugit facilis sit repellat hic nemo ipsa?",
  },

  {
    id: 3,
    name: "Jane",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2apztSw2a9Nzw3jedprGNLItfXNrf2jI_cw&s",
    phone: "+234 705 333 3484",
    location: "Yaba, Lagos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ullam expedita ducimus animi fugit facilis sit repellat hic nemo ipsa?",
  },

  {
    id: 4,
    name: "Stella",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2apztSw2a9Nzw3jedprGNLItfXNrf2jI_cw&s",
    phone: "+234 705 333 3484",
    location: "Ikeja, Lagos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ullam expedita ducimus animi fugit facilis sit repellat hic nemo ipsa?",
  },
];

const ImageSlider = () => {
  const [slidesToShow, setSlidesToShow] = useState(1);

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
    autoplaySpeed: 6000,
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
          centerMode: true,
          centerPadding: "70px",
        },
      },
    ],
  };

  return (
    <div className="w-full mx-auto p-1">
      <Slider key={slidesToShow} {...settings}>
        {data.map((item, index) => (
          <div key={index} className="px-2 w-full">
            <div className="bg-customGray rounded-xl w-full">
              <img
                className="w-full h-72 object-cover object-top"
                src={item.image}
                alt={item.name}
              />
              <div className="text-white p-4 rounded-lg shadow-md w-full">
                {/* Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <CheckBadgeIcon className="text-green-500 h-5" />
                  </div>
                <HeartIcon className="h-5 text-red-500 justify-end" />
                </div>


                {/* Phone */}
                <div className="flex items-center gap-2 mb-2">
                  <PhoneIcon className="h-5 text-customPink" />
                  <a
                    href={`tel:${item.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.phone}
                  </a>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-3">
                  <MapPinIcon className="h-5 text-customPink" />
                  <p className="text-sm">{item.location}</p>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
