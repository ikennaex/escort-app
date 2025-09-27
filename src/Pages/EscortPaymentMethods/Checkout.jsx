import React, { useState } from "react";
import { useContext } from "react";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa";
import PaystackPop from "@paystack/inline-js";
import { TbCurrencyNaira } from "react-icons/tb";
import Loader from "../../Components/Loaders/Loader";
import { UserContext } from "../../Contexts/UserContext";

const Checkout = ({ amount,plan }) => {
  const { user, api } = useContext(UserContext);
  const username = user.username;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Paystack Payment

  const handlePayment = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: "pk_test_25a2903589333e2054acc1c583fd46c29449d2b9",
        amount: amount * 100,
        email: user.email,
        firstname: user.username,
        //   lastname: user.username,
        onSuccess: async (transaction) => {
          try {
            await api.post(`${baseUrl}escorts/verify-payment`, {
              reference: transaction.reference,
              amount,
              plan
              // username,
            });
            alert("Upgrade to premium user successful");
            navigate(`/escortdashboard/${user._id}`);
          } catch (err) {
            console.error("Error verifying payment:", err);
            alert(
              "Something went wrong while verifying your payment. Please contact support."
            );
          } finally {
            setLoading(false);
          }
        },
        onCancel: () => {
          setLoading(false);
          alert("Payment Cancelled");
        },
      });
    } catch (err) {
      console.error("Payment initialization error:", err);
      setLoading(false);
      alert("Unable to start payment. Please try again.");
    }
  };

  return (
    <button
      disabled={loading || !amount}
      onClick={handlePayment}
      className="h-12 text-white bg-customPink flex items-center mx-auto justify-center gap-3 cursor-pointer disabled:bg-customPink/50"
    >
      {!loading ? (
        <>
          <TbCurrencyNaira size={25} />
          Pay with Paystack
        </>
      ) : (
        <Loader />
      )}
    </button>
  );
};

export default Checkout;
