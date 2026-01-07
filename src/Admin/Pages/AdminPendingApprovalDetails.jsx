import React, { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import { baseUrl } from "../../baseUrl";
import { useNavigate, useParams } from "react-router";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Loader from "../../Components/Loaders/Loader";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { AdminContext } from "../../Contexts/AdminContext";
import { useContext } from "react";

const SectionCard = ({ title, children }) => (
  <div className="bg-customGray rounded-xl p-5 mb-6 shadow-lg">
    <h3 className="text-lg font-semibold mb-3 pb-2">{title}</h3>
    {children}
  </div>
);

const AdminPendingApprovalDetails = () => {
  const navigate = useNavigate();
  const [escort, setEscort] = useState(null);
  const { id } = useParams();
  const { api } = useContext(AdminContext);

  const pendingVerification = async () => {
    try {
      const response = await api.get(
        `${baseUrl}admin/getunverifiedescorts/${id}`
      );
      setEscort(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveEscort = async (id) => {
    try {
      const response = await api.patch(`${baseUrl}admin/approveescort/${id}`);
      toast.success(response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
      navigate("/admin/pending");
    } catch (err) {
      toast.success(err.response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
      console.error(err);
    }
  };
  
  const rejectEscort = async (id) => {
    try {
      const response = await api.patch(`${baseUrl}admin/rejectescort/${id}`);
      toast.success(response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
      navigate("/admin/pending");
    } catch (err) {
      toast.success(err.response.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
      console.error(err);
    }
  };

  useEffect(() => {
    pendingVerification();
  }, []);

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

  // useEffect for verification image
  useEffect(() => {
    if (escort?.verificationImage) {
      const image = new Image();
      image.src = escort.verificationImage;
      image.onload = () => {
        setDimensions((prev) => ({
          ...prev,
          verification: {
            width: image.naturalWidth,
            height: image.naturalHeight,
          },
        }));
      };
    }
  }, [escort?.verificationImage]);

  if (!escort) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex text-white mx-auto">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-6 md:ml-64">
        <h1 className="text-2xl font-bold mt-12 md:mt-0 mb-6">
          Pending User Details{" "}
          <p>
            <span className="font-semibold text-customPink">
              Account created on:{" "}
            </span>
            {format(new Date(escort.createdAt), "PPP")}
          </p>
        </h1>

        {/* Basic Info */}
        <SectionCard title="Basic Info">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">Display Name:</span>{" "}
              {escort.displayName}
            </p>
            <p>
              <span className="font-medium">Username:</span> @{escort.username}
            </p>
            <p>
              <span className="font-medium">Email:</span> {escort.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {escort.phoneNumber}
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
                {escort?.gallery?.map((img, index) => {
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
                      caption={`Photo ${index + 1} of ${escort?.displayName}`}
                    >
                      {({ ref, open }) => (
                        <div
                          ref={ref}
                          onClick={open}
                          className="w-full aspect-square flex items-center justify-center rounded-lg overflow-hidden cursor-pointer"
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
          </SectionCard>
        )}

        {/* Verification */}
        <SectionCard title="Verification Image">
          <Gallery>
            <Item
              original={escort?.verificationImage}
              thumbnail={escort?.verificationImage}
              width={dimensions.verification?.width || 1024}
              height={dimensions.verification?.height || 768}
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
      </div>
    </div>
  );
};

export default AdminPendingApprovalDetails;
