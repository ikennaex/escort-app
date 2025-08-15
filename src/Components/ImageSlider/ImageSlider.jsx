// import { PhoneIcon } from '@heroicons/react/24/outline'
import {
  CheckBadgeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import React from "react";

const ImageSlider = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-customGray rounded-xl">
        <img
          className="w-full h-96 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2apztSw2a9Nzw3jedprGNLItfXNrf2jI_cw&s"
          alt="image slider"
        />
        <div className="text-white p-4 rounded-lg shadow-md max-w-sm">
          {/* Name */}
          <div className="flex items-center gap-2 mb-2">
            <p className="font-semibold text-lg">Stella</p>
            <CheckBadgeIcon className="text-green-500 h-5" />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 mb-2">
            <PhoneIcon className="h-5 text-customPink" />
            <a
              href="tel:+2347053333484"
              className="text-blue-600 hover:underline"
            >
              +234 705 333 3484
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mb-3">
            <MapPinIcon className="h-5 text-customPink" />
            <p className="text-sm">Ikeja, Lagos</p>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            ullam expedita ducimus animi fugit facilis sit repellat hic nemo
            ipsa?
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
