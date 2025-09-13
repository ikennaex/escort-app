import {
  CakeIcon,
  CheckBadgeIcon,
  FlagIcon,
  GiftIcon,
  InformationCircleIcon,
  NewspaperIcon,
  PhotoIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { differenceInYears } from "date-fns";
import { FaWhatsapp } from "react-icons/fa";
import { BsCake, BsGenderAmbiguous, BsRulers } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import ProfileTabs from "./ProfileTabs";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useParams } from "react-router";

const calculateAge = (dob) => {
  if (!dob) return null;
  return differenceInYears(new Date(), new Date(dob));
};

const EscortDetailsPage = () => {
  const { id } = useParams();
  const [escort, setEscort] = useState({});
  const [error, setError] = useState("");

  const fetchEscort = async () => {
    try {
      const response = await axios.get(`${baseUrl}escorts/${id}`);
      setEscort(response.data);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchEscort();
  }, []);

  console.log(escort);

  return (
    <div className="bg-pink-100">
      <div className="lg:flex pb-5bg-[#fff8f9] mx-2 rounded-lg">
        <img
          className="lg:h-full lg:w-40 w-full h-96 object-cover object-top"
          src= {escort.gallery?.[0]}
          alt=""
        />

        <div className="px-3 py-3">
          <div>
            <div className="flex gap-2 items-center">
              <p className="font-bold text-2xl">{escort.displayName}</p>
              <p className="font-bold text-2xl">· {calculateAge(escort.dob)}</p>
              <CheckBadgeIcon className="text-green-500 h-5" />
            </div>

            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-green-500 " />
              <p>{escort.phoneNumber}</p>
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
                <p className="text-[10px] font-bold text-pink-500">Report</p>
              </div>
              <div className="flex items-center justify-center gap-1 bg-orange-200 rounded-xl px-2 py-1">
                <ShareIcon className="h-5 text-orange-500" />
                <p className="text-[10px] font-bold text-orange-500">Share</p>
              </div>
            </div>
          </div>

          <div className="flex text-center justify-between w-3/4 mx-auto py-3">
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
            <p>
              {escort.heading}
            </p>
          </div>

          <div className="flex justify-between  mx-auto py-3">
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

          <div className="flex mx-auto justify-between w-3/4 items-center">
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
      <ProfileTabs escort = {escort} />
    </div>
  );
};

export default EscortDetailsPage;
