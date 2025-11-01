import React from "react";
import { guide } from "../../../../imports";
import { Link } from "react-router";

const VideoGuide = () => {
  return (
    <div className="bg-pink-100 p-4 h-lvh flex flex-col items-center">
      <p className="mb-2">
        Ensure to watch this guide properly before continuing
      </p>

      <video muted src={guide} controls className="w-full max-w-lg rounded" />

      <Link to={"/register-escort"}>
        <button className="mt-6 w-full bg-customPink text-white py-2 px-4 rounded-lg hover:bg-pink-500 transition">
          Continue to register
        </button>
      </Link>
    </div>
  );
};

export default VideoGuide;
