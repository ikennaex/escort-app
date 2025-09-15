import { useState } from "react";
import {
  InformationCircleIcon,
  PhotoIcon,
  NewspaperIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { CheckIcon } from "lucide-react";

const ProfileTabs = ({ escort }) => {
  const [activeTab, setActiveTab] = useState("About"); // default tab
  console.log(escort);
  console.log(escort.gallery);
  console.log(escort.services);
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
              className={activeTab === "About" ? "font-bold text-pink-600" : ""}
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
            <p>{escort.about}</p>

            <div className="grid grid-cols-2 gap-4 my-7">
              <div>
                <p className="font-semibold text-customPink">Gender</p>
                <p className="font-semibold">{escort.gender}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Bust Size</p>
                <p className="font-semibold">{escort.bustSize}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Ethnicity</p>
                <p className="font-semibold">{escort.ethnicity}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Smoker</p>
                <p className="font-semibold">{escort.smoker}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">
                  Sexual Orientation
                </p>
                <p className="font-semibold">{escort.sexualOrientation}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Country</p>
                <p className="font-semibold">{escort.country}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">State</p>
                <p className="font-semibold">{escort.state}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">City</p>
                <p className="font-semibold">{escort.city}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Build</p>
                <p className="font-semibold">{escort.bodyBuild}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Education</p>
                <p className="font-semibold">{escort.education}</p>
              </div>
            </div>

            <div className="my-7">
              <h1 className="text-2xl font-semibold">Rates</h1>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-[#fff8f9] rounded-lg shadow">
                  <thead>
                    <tr className="text-left text-gray-700">
                      <th className="px-4 py-3">Service</th>
                      <th className="px-4 py-3">Incall</th>
                      <th className="px-4 py-3">Outcall</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-bold text-customPink uppercase">
                        Short Time
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort.shortimeIncall}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort.shortimeOutcall}
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-bold text-customPink uppercase">
                        Over Night
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort.overnightIncall}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort.overnightOutcall}
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3 font-bold text-customPink uppercase">
                        Weekend
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort.weekendIncall}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort.weekendOutcall}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-semibold">Services</h1>

              <div className="mt-3">
                <ul className="space-y-2 flex flex-wrap">
                  {escort.services.map((service, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckIcon className="h-5 w-5 text-customPink" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {activeTab === "Gallery" && (
          <>
            <p className="font-semibold">Gallery</p>
            <Gallery withDownloadButton withZoomButton withFullscreenButton>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {escort.gallery.map((img, index) => (
                  <Item
                    key={index}
                    original={img} // full-size image
                    thumbnail={img} // preview
                    width="1024" // you can set real image dimensions if available
                    height="768"
                    caption={`Photo ${index + 1} of ${escort.displayName}`}
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="w-full aspect-square border-2 border-dotted border-pink-400 flex items-center justify-center rounded-lg overflow-hidden cursor-pointer"
                      >
                        <img
                          src={img}
                          alt="Gallery"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </Item>
                ))}
              </div>
            </Gallery>
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
