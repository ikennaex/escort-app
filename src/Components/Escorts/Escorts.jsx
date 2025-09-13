import React, { useEffect, useState } from "react";
import {
  CheckBadgeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { baseUrl } from "../../baseUrl";
import { fetchEscorts } from "./fetchEscorts";

// const escorts = [
//   {
//     id: 1,
//     name: "Stella",
//     image:
//       "https://img.freepik.com/premium-photo/portrait-smiling-young-woman-red-dress-footpath_1048944-29109377.jpg?ga=GA1.1.2145612538.1736353082&semt=ais_hybrid&w=740&q=80",
//     phone: "+234 705 333 3484",
//     location: "Ikeja, Lagos",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ullam expedita ducimus animi fugit facilis sit repellat hic nemo ipsa?",
//   },

//   {
//     id: 2,
//     name: "Mercy",
//     image:
//       "https://img.freepik.com/premium-photo/studio-photoshoot-modeling_1048944-3927801.jpg?ga=GA1.1.2145612538.1736353082&semt=ais_hybrid&w=740&q=80",
//     phone: "+234 705 333 3484",
//     location: "Magodo, Lagos",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ullam expedita ducimus animi fugit facilis sit repellat hic nemo ipsa?",
//   },

//   {
//     id: 3,
//     name: "Jane",
//     image:
//       "https://img.freepik.com/free-photo/woman-wearing-red-body-suit-red-background_633478-239.jpg?ga=GA1.1.2145612538.1736353082&semt=ais_hybrid&w=740&q=80",
//     phone: "+234 705 333 3484",
//     location: "Yaba, Lagos",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ullam expedita ducimus animi fugit facilis sit repellat hic nemo ipsa?",
//   },

//   {
//     id: 4,
//     name: "Stella",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2apztSw2a9Nzw3jedprGNLItfXNrf2jI_cw&s",
//     phone: "+234 705 333 3484",
//     location: "Ikeja, Lagos",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ullam expedita ducimus animi fugit facilis sit repellat hic nemo ipsa?",
//   },
// ];

const Escorts = () => {
  const [escorts, setEscorts] = useState([]);
  const [error, setError] = useState("")
  // for pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadEscorts = async () => {
    try {
      const response = await fetchEscorts(page, 10);
      if (response) {
        console.log(response)
        setEscorts(response.escortDoc);
        setTotalPages(response.totalPages);
      }
    } catch (err) {
      setError(err.respone.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    loadEscorts()
  }, [page])

  return (
    <div className="p-1 bg-black py-10">
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
        {error && <div className="text-red-700">{error}</div>}
        {escorts.map((item) => (
          <Link to={`/escorts/${item._id}`}>
            <div
              key={item._id}
              className="relative overflow-hidden h-[300px] border-2 border-white"
            >
              {/* Background Image */}
              <img
                src={item.gallery[0]}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />

              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 text-white lg:p-4 p-2 h-2/5 bg-pink-950/70 w-full  flex flex-col justify-end">
                {/* Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-md">{item.displayName}</p>
                    <CheckBadgeIcon className="text-green-500 h-4" />
                  </div>
                  <HeartIcon className="h-5 text-red-500 justify-end" />
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 lg:mb-2">
                  <PhoneIcon className="h-4 text-white hidden md:block" />
                  <a
                    href={`tel:${item.phoneNumber}`}
                    className="text-blue-600 lg:text-sm text-[10px] hover:underline"
                  >
                    {item.phoneNumber}
                  </a>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 lg:mb-2">
                  <MapPinIcon className="h-4 text-white hidden md:block" />
                  <p className="lg:text-sm text-[10px]">{item.city + ", " + item.state + ", " +  item.country}</p>
                </div>

                {/* Description */}
                <p className="lg:text-sm text-[10px] leading-relaxed">
                  {item.about}
                  {/* word count 20 */}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Escorts;
