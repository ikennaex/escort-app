import React from "react";
import {
  CheckBadgeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

const escorts = [
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

const Escorts = () => {
  return (
    <div className="p-1 bg-black py-10">
      <div className="grid md:grid-cols-4 gap-3">
        {escorts.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-md"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover object-top"
            />

            {/* Info */}
            <div className="text-white p-4">
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
        ))}
      </div>
    </div>
  );
};

export default Escorts;
