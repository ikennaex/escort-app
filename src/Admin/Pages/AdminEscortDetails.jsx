import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";
import { baseUrl } from "../../baseUrl";
import { useEffect } from "react";
import axios from "axios";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { format } from "date-fns";
import Loader from "../../Components/Loaders/Loader";

const AdminEscortDetails = () => {
  const [escort, setEscort] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(escort?.isPremium);

  const fetchEscortDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}admin/getallescorts/${id}`);
      console.log(response);
      setEscort(response.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEscortDetails();
  }, []);

  console.log(escort);

  const SectionCard = ({ title, children }) => (
    <div className="bg-customGray rounded-xl p-5 mb-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-3 pb-2">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="flex text-white mx-auto">
      <AdminSidebar />
      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <h1 className="text-2xl font-bold md:mt-0 mt-12 mb-">
          Escort Details
        </h1>

        {loading ? (
          <div className="flex items-center justify-center mx-auto h-screen">
            <Loader />
          </div>
        ) : (
          <div className="">
              <p className="my-3">
                <span className="font-semibold text-customPink">
                  Account created on:{" "}
                </span>
                {escort?.createdAt
                  ? format(new Date(escort.createdAt), "PPP")
                  : "—"}
              </p>

            {/* Basic Info */}
            <SectionCard title="Basic Info">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium">Display Name:</span>{" "}
                  {escort.displayName}
                </p>
                <p>
                  <span className="font-medium">Username:</span> @
                  {escort.username}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {escort.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {escort.phoneNumber}
                </p>
                <p>
                  <span className="font-medium">DOB:</span>{" "}
                  {new Date(escort.dob).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Gender:</span> {escort.gender}
                </p>
                <p>
                  <span className="font-medium">Location:</span> {escort.city},{" "}
                  {escort.state}, {escort.country}
                </p>
              </div>
            </SectionCard>

            {/* Profile */}
            <SectionCard title="Profile">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium">Heading:</span> {escort.heading}
                </p>
                <p>
                  <span className="font-medium">Education:</span>{" "}
                  {escort.education || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Occupation:</span>{" "}
                  {escort.occupation || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Ethnicity:</span>{" "}
                  {escort.ethnicity || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Bust Size:</span>{" "}
                  {escort.bustSize || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Height:</span>{" "}
                  {escort.height || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Weight:</span>{" "}
                  {escort.weight || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Body Build:</span>{" "}
                  {escort.bodyBuild || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Looks:</span>{" "}
                  {escort.looks || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Smoker:</span>{" "}
                  {escort.smoker || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Orientation:</span>{" "}
                  {escort.sexualOrientation || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Language:</span>{" "}
                  {escort.language || "N/A"}
                </p>
              </div>
            </SectionCard>

            {/* Gallery */}
            {escort.gallery?.length > 0 && (
              <SectionCard title="Gallery">
                <Gallery>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {escort.gallery.map((img, idx) => (
                      <Item
                        key={idx}
                        original={img}
                        thumbnail={img}
                        width="1024"
                        height="768"
                      >
                        {({ ref, open }) => (
                          <img
                            ref={ref}
                            onClick={open}
                            src={img}
                            alt={`escort-${idx}`}
                            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
                          />
                        )}
                      </Item>
                    ))}
                  </div>
                </Gallery>
              </SectionCard>
            )}

            {/* Verification */}
            <SectionCard title="Verification Image">
              <Gallery>
                <Item
                  original={escort?.verificationImage}
                  thumbnail={escort?.verificationImage}
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src={escort?.verificationImage}
                      alt="verification"
                      className="w-40 h-40 object-cover rounded-lg border border-gray-700 cursor-pointer"
                    />
                  )}
                </Item>
              </Gallery>
              <p className="mt-2 text-sm text-gray-400">
                Confirm if this matches with the gallery.
              </p>
            </SectionCard>

            {/* Bank Details */}
            <SectionCard title="Bank Details">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium">Bank Name:</span>{" "}
                  {escort.bankDetails?.bankName || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Account Name:</span>{" "}
                  {escort.bankDetails?.accountName || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Account Number:</span>{" "}
                  {escort.bankDetails?.accountNumber || "N/A"}
                </p>
              </div>
            </SectionCard>

            {/* Status */}
            <SectionCard title="Status">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium">Premium:</span>{" "}
                  {escort.premium ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Email Verified:</span>{" "}
                  {escort.isVerified ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Registration Complete:</span>{" "}
                  {escort.registrationComplete ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Active:</span>{" "}
                  {escort.isActive ? "Yes" : "No"}
                </p>
              </div>
            </SectionCard>

            {/* About */}
            {escort.about && (
              <SectionCard title="About">
                <p className="text-sm text-gray-300">{escort.about}</p>
              </SectionCard>
            )}

            {/* Actions */}
            <p className="">Options</p>
            {!escort.isActive && (
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => approveEscort(escort._id)}
                  className="flex-1 py-3 rounded-lg bg-customPink hover:bg-customPink/20 font-semibold"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectEscort(escort._id)}
                  className="flex-1 py-3 rounded-lg border-2 border-customPink hover:bg-red-700 font-semibold"
                >
                  Reject
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEscortDetails;
