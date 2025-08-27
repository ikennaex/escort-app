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
import { FaWhatsapp } from "react-icons/fa";
import { BsCake, BsGenderAmbiguous, BsRulers } from "react-icons/bs";
import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

const EscortDetailsPage = () => {
  return (
    <div className="bg-pink-100">
      <div className="lg:flex pb-5bg-[#fff8f9] mx-2 rounded-lg">
        <img
          className="lg:h-full lg:w-40 w-full h-96 object-cover object-top"
          src="https://img.freepik.com/premium-photo/studio-photoshoot-modeling_1048944-3927801.jpg?ga=GA1.1.2145612538.1736353082&semt=ais_hybrid&w=740&q=80"
          alt=""
        />

        <div className="px-3 py-3">
          <div>
            <div className="flex gap-2 items-center">
              <p className="font-bold text-2xl">Sandra</p>
              <p className="font-bold text-2xl">· 23</p>
              <CheckBadgeIcon className="text-green-500 h-5" />
            </div>

            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-green-500 " />
              <p>+234 806 445 1234</p>
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
              unde consequatur perspiciatis corrupti at incidunt quod architecto
              pariatur illo aliquid.
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
              <p className="font-semibold">Female</p>
            </div>
            <div className="text-center">
              <BsCake className="text-pink-500 text-3xl" />
              <p className="font-semibold">34</p>
            </div>
            <div className="text-center">
              <BsRulers className="text-2xl text-pink-500" />
              <p className="font-semibold">5"5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-5  rounded-lg">
        <nav className="mx-3 rounded-lg bg-[#fff8f9] my-4 py-4 px-1 overflow-x-auto">
          <ul className="flex gap-6 whitespace-nowrap px-4 text-gray-700">
            <div className="flex  gap-1 items-center">
              <InformationCircleIcon className="h-4" />
              <li>About</li>
            </div>

            <div className="flex gap-1 items-center">
              <PhotoIcon className="h-4" />
              <li>Gallery</li>·<p>5</p>
            </div>

            <div className="flex gap-1 items-center">
              <NewspaperIcon className="h-4" />
              <li>Timeline</li>·<p>5</p>
            </div>

            <div className="flex gap-1 items-center">
              <NewspaperIcon className="h-4" />
              <li>Gift Shop</li>·<p>5</p>
            </div>

            <div className="flex gap-1 items-center">
              <NewspaperIcon className="h-4" />
              <li>Timeline</li>·<p>5</p>
            </div>

            <div className="flex gap-1 items-center">
              <NewspaperIcon className="h-4" />
              <li>Gift Shop</li>·<p>5</p>
            </div>

            <div className="flex gap-1 items-center">
              <NewspaperIcon className="h-4" />
              <li>Gift Shop</li>·<p>5</p>
            </div>

            <div className="flex gap-1 items-center">
              <StarIcon className="h-4" />
              <li>Reviews</li>·<p>5</p>
            </div>
          </ul>
        </nav>

        <div className="bg-[#fff8f9] my-4 mx-3 p-4">
            <p className="font-semibold">About</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
              unde consequatur perspiciatis corrupti at incidunt quod architecto
              pariatur illo aliquid.
            </p>
        </div>
      </div>
    </div>
  );
};

export default EscortDetailsPage;
