import { useState } from "react";
import {
  InformationCircleIcon,
  PhotoIcon,
  NewspaperIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { Ban, CheckIcon } from "lucide-react";
import { useEffect } from "react";
import { format } from "date-fns";

const ProfileTabs = ({ escort, reports }) => {
  const [activeTab, setActiveTab] = useState(reports ? "Reports" : "About"); // default tab

  // control img dimension
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    escort?.gallery?.forEach((img, i) => {
      const image = new Image();
      image.src = img;
      image.onload = () => {
        setDimensions((prev) => ({
          ...prev,
          [i]: { width: image.naturalWidth, height: image.naturalHeight },
        }));
      };
    });
  }, [escort?.gallery]);

  return (
    <div className="pb-5 rounded-lg lg:flex lg:gap-2">
      {/* NAV */}
      <nav className=" rounded-lg bg-[#fff8f9] lg:h-fit my-4 py-4 px-2 lg:w-64 shrink-0">
        <ul className="flex overflow-x-auto lg:flex-col gap-6 px-2 text-gray-700 scrollbar-hidden">
          {reports && (
            <div
              onClick={() => setActiveTab("Reports")}
              className="flex flex-none gap-2 items-center cursor-pointer"
            >
              <Ban className="h-4" />
              <li
                className={
                  activeTab === "Reports" ? "font-bold text-pink-600" : ""
                }
              >
                Reports
              </li>
            </div>
          )}

          <div
            onClick={() => setActiveTab("About")}
            className="flex flex-none gap-2 items-center cursor-pointer"
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
            className="flex flex-none gap-2 items-center cursor-pointer"
          >
            <PhotoIcon className="h-4" />
            <li
              className={
                activeTab === "Gallery" ? "font-bold text-pink-600" : ""
              }
            >
              Gallery
            </li>
            <p className="text-sm text-gray-500">· {escort.gallery?.length}</p>
          </div>

          <div
            onClick={() => setActiveTab("Timeline")}
            className="flex flex-none gap-2 items-center cursor-pointer"
          >
            <NewspaperIcon className="h-4" />
            <li
              className={
                activeTab === "Timeline" ? "font-bold text-pink-600" : ""
              }
            >
              Timeline
            </li>
          </div>

          <div
            onClick={() => setActiveTab("Gift Shop")}
            className="flex flex-none gap-2 items-center cursor-pointer"
          >
            <NewspaperIcon className="h-4" />
            <li
              className={
                activeTab === "Gift Shop" ? "font-bold text-pink-600" : ""
              }
            >
              Gift Shop
            </li>
          </div>

          <div
            onClick={() => setActiveTab("Reviews")}
            className="flex flex-none gap-2 items-center cursor-pointer"
          >
            <StarIcon className="h-4" />
            <li
              className={
                activeTab === "Reviews" ? "font-bold text-pink-600" : ""
              }
            >
              Reviews
            </li>
          </div>
        </ul>
      </nav>

      {/* CONTENT */}
      <div className="bg-[#fff8f9] my-4  p-6 flex-1 rounded-lg">
        {activeTab === "Reports" && (
          <>
            <div>
              <p className="font-semibold text-lg mb-4">Reports</p>
              {reports.map((report, index) => (
                <div key={index} className="p-3 mb-2">
                  <p className="uppercase font-semibold">{report.reason}</p>
                  <p className="text-gray-600 text-sm">{report.details}</p>

                  <Gallery
                    withDownloadButton
                    withZoomButton
                    withFullscreenButton
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
                      {report?.proof.map((img, index) => {
                        const dim = dimensions[index] || {
                          width: 1024,
                          height: 768,
                        };
                        return (
                          <Item
                            key={index}
                            original={img}
                            thumbnail={img}
                            width={dim.width}
                            height={dim.height}
                            caption={`Photo ${index + 1} of ${
                              escort?.displayName
                            }`}
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
                        );
                      })}
                    </div>
                  </Gallery>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "About" && (
          <>
            <p className="font-semibold text-lg">About</p>
            <p className="mt-2 text-gray-700">{escort?.about}</p>

            {/* GRID DETAILS */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 my-7">
              <div>
                <p className="font-semibold text-customPink">Gender</p>
                <p className="font-semibold">{escort?.gender}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Bust Size</p>
                <p className="font-semibold">{escort?.bustSize}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Ethnicity</p>
                <p className="font-semibold">{escort?.ethnicity}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Smoker</p>
                <p className="font-semibold">{escort?.smoker}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">
                  Sexual Orientation
                </p>
                <p className="font-semibold">{escort?.sexualOrientation}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Country</p>
                <p className="font-semibold">{escort?.country}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">State</p>
                <p className="font-semibold">{escort?.state}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">City</p>
                <p className="font-semibold">{escort?.city}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Build</p>
                <p className="font-semibold">{escort?.bodyBuild}</p>
              </div>
              <div>
                <p className="font-semibold text-customPink">Education</p>
                <p className="font-semibold">{escort?.education}</p>
              </div>
            </div>

            <div className="flex lg:flex-row lg:justify-around flex-col">
              <div className="flex">
                <p className="font-bold text-customPink mr-2">Last Login:</p>
                {escort?.lastLogin
                  ? format(new Date(escort?.lastLogin), "MMMM d, yyyy")
                  : "—"}
              </div>

              <div className="flex">
                <p className="font-bold text-customPink mr-2">Profile Viewed:</p>
                <span className="bg-customPink rounded-2xl px-3 text-white mr-2">{escort?.views}</span> times
              </div>
            </div>

            {/* RATES TABLE */}
            <div className="my-7">
              <h1 className="text-2xl font-semibold mb-3">Rates</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                  <thead>
                    <tr className="text-left text-gray-700 border-b">
                      <th className="px-4 py-3">Service</th>
                      <th className="px-4 py-3">Incall</th>
                      <th className="px-4 py-3">Outcall</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-bold text-customPink uppercase">
                        Short Time
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort?.shortimeIncall}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort?.shortimeOutcall}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-bold text-customPink uppercase">
                        Over Night
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort?.overnightIncall}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort?.overnightOutcall}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-customPink uppercase">
                        Weekend
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort?.weekendIncall}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        ₦{escort?.weekendOutcall}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h1 className="text-2xl font-semibold mb-3">Services</h1>
              <ul className="flex flex-wrap gap-4">
                {escort?.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <CheckIcon className="h-3 w-3 text-customPink" />
                    <span className="lg:text-sm ">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === "Gallery" && (
          <>
            <p className="font-semibold text-lg mb-2">Gallery</p>
            <Gallery withDownloadButton withZoomButton withFullscreenButton>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
                {escort?.gallery.map((img, index) => {
                  const dim = dimensions[index] || { width: 1024, height: 768 };
                  return (
                    <Item
                      key={index}
                      original={img}
                      thumbnail={img}
                      width={dim.width}
                      height={dim.height}
                      caption={`Photo ${index + 1} of ${escort?.displayName}`}
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
                  );
                })}
              </div>
            </Gallery>
          </>
        )}

        {activeTab === "Timeline" && (
          <>
            <p className="font-semibold text-lg">Timeline</p>
            <p className="mt-2 text-gray-700">
              All timeline posts and activities will be shown here.
            </p>
          </>
        )}

        {activeTab === "Gift Shop" && (
          <>
            <p className="font-semibold text-lg">Gift Shop</p>
            <p className="mt-2 text-gray-700">
              List of available gifts and products here.
            </p>
          </>
        )}

        {activeTab === "Reviews" && (
          <>
            <p className="font-semibold text-lg">Reviews</p>
            <p className="mt-2 text-gray-700">
              Customer reviews and ratings will appear here.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileTabs;
