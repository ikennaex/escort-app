import React from "react";
import { Link } from "react-router";

const EscortBoostProfile = () => {

  return (
    <div className="h-screen bg-pink-100 p-2">
      <p className="text-2xl text-customGray font-semibold mb-4">Boost your Profile</p>
      <div className="flex flex-col lg:flex-row gap-3 items-center justify-center">
        <div className="bg-pink-200 lg:w-2/5 w-full flex items-center flex-col rounded-xl p-5">
          <img
          className="h-20"
            src="https://cdn-icons-png.flaticon.com/128/8983/8983163.png"
            alt=""
          />
          <p className="text-xl font-semibold mt-2">Pay with Bank Transfer, Card or USSD</p>

          <Link to = {"/escorts/bankpay"}>
          <button className="bg-customPink my-4 py-2">Proceed</button>
          </Link>
        </div>

        <div className="bg-pink-200 lg:w-2/5 w-full flex items-center flex-col rounded-xl p-5">
          <img
          className="h-20"
            src="https://cdn-icons-png.flaticon.com/128/5968/5968260.png"
            alt=""
          />
          <p className="text-xl font-semibold mt-2">Pay with Crypto</p>

          <Link to = {"/escorts/cryptopay"}>
          <button className="bg-customPink my-4 py-2">Proceed</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EscortBoostProfile;
