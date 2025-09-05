import { useState } from "react";
import {
  InformationCircleIcon,
  PhotoIcon,
  NewspaperIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("About"); // default tab

  return (
    <div className="pb-5 rounded-lg">
      {/* NAV */}
      <nav className="mx-3 rounded-lg bg-[#fff8f9] my-4 py-4 px-1 overflow-x-auto">
        <ul className="flex gap-6 whitespace-nowrap px-4 text-gray-700">
          <div
            onClick={() => setActiveTab("About")}
            className="flex gap-1 items-center cursor-pointer"
          >
            <InformationCircleIcon className="h-4" />
            <li
              className={
                activeTab === "About" ? "font-bold text-pink-600" : ""
              }
            >
              About
            </li>
          </div>

          <div
            onClick={() => setActiveTab("Gallery")}
            className="flex gap-1 items-center cursor-pointer"
          >
            <PhotoIcon className="h-4" />
            <li
              className={
                activeTab === "Gallery" ? "font-bold text-pink-600" : ""
              }
            >
              Gallery
            </li>
            ·<p>5</p>
          </div>

          <div
            onClick={() => setActiveTab("Timeline")}
            className="flex gap-1 items-center cursor-pointer"
          >
            <NewspaperIcon className="h-4" />
            <li
              className={
                activeTab === "Timeline" ? "font-bold text-pink-600" : ""
              }
            >
              Timeline
            </li>
            ·<p>5</p>
          </div>

          <div
            onClick={() => setActiveTab("Gift Shop")}
            className="flex gap-1 items-center cursor-pointer"
          >
            <NewspaperIcon className="h-4" />
            <li
              className={
                activeTab === "Gift Shop" ? "font-bold text-pink-600" : ""
              }
            >
              Gift Shop
            </li>
            ·<p>5</p>
          </div>

          <div
            onClick={() => setActiveTab("Reviews")}
            className="flex gap-1 items-center cursor-pointer"
          >
            <StarIcon className="h-4" />
            <li
              className={
                activeTab === "Reviews" ? "font-bold text-pink-600" : ""
              }
            >
              Reviews
            </li>
            ·<p>5</p>
          </div>
        </ul>
      </nav>

      {/* CONTENT */}
      <div className="bg-[#fff8f9] my-4 mx-3 p-4">
        {activeTab === "About" && (
          <>
            <p className="font-semibold">About</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
              unde consequatur perspiciatis corrupti at incidunt quod architecto
              pariatur illo aliquid.
            </p>
          </>
        )}

        {activeTab === "Gallery" && (
          <>
            <p className="font-semibold">Gallery</p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <img
                src="https://via.placeholder.com/150"
                alt="Gallery 1"
                className="rounded-lg"
              />
              <img
                src="https://via.placeholder.com/150"
                alt="Gallery 2"
                className="rounded-lg"
              />
              <img
                src="https://via.placeholder.com/150"
                alt="Gallery 3"
                className="rounded-lg"
              />
              <img
                src="https://via.placeholder.com/150"
                alt="Gallery 4"
                className="rounded-lg"
              />
              <img
                src="https://via.placeholder.com/150"
                alt="Gallery 5"
                className="rounded-lg"
              />
            </div>
          </>
        )}

        {activeTab === "Timeline" && (
          <>
            <p className="font-semibold">Timeline</p>
            <p>All timeline posts and activities will be shown here.</p>
          </>
        )}

        {activeTab === "Gift Shop" && (
          <>
            <p className="font-semibold">Gift Shop</p>
            <p>List of available gifts and products here.</p>
          </>
        )}

        {activeTab === "Reviews" && (
          <>
            <p className="font-semibold">Reviews</p>
            <p>Customer reviews and ratings will appear here.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileTabs;
