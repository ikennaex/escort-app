import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  CheckBadgeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

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
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 6000,
    cssEase: "linear",
      responsive: [
    {
      breakpoint: 1024, // screens <= 1024px
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640, // screens <= 640px (mobile)
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  };

  return (
    <div className="container mx-auto p-4">
  <Slider {...settings}>
    {data.map((item, index) => (
      <div key={index} className="px-2">
        <div className="bg-customGray rounded-xl">
        <img
          className="w-full h-96 object-cover"
          src={item.image}
          alt={item.name}
        />
        <div className="text-white p-4 rounded-lg shadow-md max-w-sm">
          {/* Name */}
          <div className="flex items-center gap-2 mb-2">
            <p className="font-semibold text-lg">{item.name}</p>
            <CheckBadgeIcon className="text-green-500 h-5" />
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
          <p className="text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
      </div>
    ))}
  </Slider>
</div>

  );
};

export default ImageSlider;
