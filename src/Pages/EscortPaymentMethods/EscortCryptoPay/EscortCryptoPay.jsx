import React, { useState } from "react";
import {
  Bitcoin,
  Wallet,
  CircleDollarSign,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { baseUrl } from "../../../baseUrl";
import { useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../Contexts/UserContext";
import { useContext } from "react";
import Loader from "../../../Components/Loaders/Loader";
import { useNavigate } from "react-router";

const EscortCryptoPay = () => {
  const [copied, setCopied] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [amount, setAmount] = useState("");
  const [rates, setRates] = useState({});
  const [plan, setPlan] = useState("");
  const { api } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Crypto Payment");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const wallets = [
    {
      name: "Bitcoin",
      icon: <Bitcoin className="h-6 w-6 text-yellow-500" />,
      address: "bc1ql8svwjqdknr8j78w60k4n8ye66fgntpnzrhqyz",
    },
    {
      name: "Litecoin",
      icon: <CircleDollarSign className="h-6 w-6 text-gray-500" />,
      address: "ltc1q80g8s4t5kflhjcrtpy9ldsy8tp352rrwlqcs4w",
    },
    {
      name: "Ethereum",
      icon: <Wallet className="h-6 w-6 text-purple-500" />,
      address: "0xAb18b216a971eA24F475400657BeAc376E0f7bE5",
    },
    {
      name: "USDT (TRC20)",
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      address: "TFK4gmxCZHvb2CEX6VYcVJMHNe7nJJpqKn",
    },
  ];

  const fetchRates = async () => {
    try {
      const response = await axios.get(`${baseUrl}escorts/premium/rates`);
      let rates = response.data;

      // Create a conversion map for easier maintenance
      const conversionMap = {
        weekly: 7000,
        biweekly: 14000,
        monthly: 25000,
        quarterly: 71000,
        "semi-annually": 150000,
        annually: 260000,
      };

      // Loop through the keys and replace matching values
      Object.keys(conversionMap).forEach((key) => {
        if (Number(rates[key]) === conversionMap[key]) {
          // Replace with display-friendly rate
          const displayValues = {
            weekly: 7,
            biweekly: 15,
            monthly: 25,
            quarterly: 70,
            "semi-annually": 150,
            annually: 250,
          };
          rates[key] = displayValues[key];
        }
      });

      setRates(rates);
    } catch (err) {
      console.error("Error fetching rates:", err);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleSelect = (e) => {
    const selected = e.target.value;
    setPlan(selected);
    setAmount(rates?.[selected] || null);
  };

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(address);

    setTimeout(() => setCopied(""), 2000); // hide after 2s
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReceipt(file);
    // setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receipt || !amount || !plan) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", receipt);
    formData.append("amount", amount);
    formData.append("plan", plan);
    formData.append("paymentMethod", paymentMethod);

    try {
      setLoading(true);
      const response = await api.post("/escorts/receipt", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(
        "Payment details submitted successfully you'll be notified once payment is confirmed!"
      );
      navigate(`/escortdashboard/${user._id}`);
    } catch (err) {
      setLoading(false);
      console.error("Error submitting payment details:", err);
      alert(err.response?.data?.message || "Error submitting payment details");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="h-screen bg-pink-100 p-6 flex flex-col items-center relative overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-6">Escort Crypto Payments</h1>

      {/* Subscription Rates */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg mb-6">
        <h2 className="text-lg font-semibold text-pink-800 mb-4">
          Dollar Rate Subscription
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          PLEASE send the exact amount to one of the wallets below. Once payment
          is made, click the button below and upload your receipt for
          verification.
        </p>

        <ul className="space-y-2 text-gray-700 text-sm">
          <li>$7 - One Week Boosting</li>
          <li>$15 - Two Weeks Boosting</li>
          <li>$25 - One Month Boosting</li>
          <li>$70 - Three Months Boosting</li>
          <li>$150 - Six Months Boosting</li>
          <li>$250 - One Year Boosting</li>
        </ul>
      </div>

      {/* Wallet Addresses */}
      <div className="grid gap-4 w-full max-w-lg">
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-5 relative">
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {/* Warning Message */}
              <div className="flex items-start gap-3 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-yellow-600 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM2.25 12c0 5.385 
          4.365 9.75 9.75 9.75s9.75-4.365 
          9.75-9.75S17.385 2.25 12 2.25S2.25 6.615 
          2.25 12z"
                  />
                </svg>
                <p className="text-sm text-yellow-800 font-medium leading-5">
                  Please ensure the payment receipt you upload matches the
                  selected duration and payment amount. Incorrect or unclear
                  receipts may delay your account verification.
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Select Duration Paid For
                </label>
                <select
                  onChange={handleSelect}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select a duration</option>
                  <option value="weekly">Weekly (1 Week)</option>
                  <option value="biweekly">Biweekly (2 Weeks)</option>
                  <option value="monthly">Monthly (1 Month)</option>
                  <option value="quarterly">Quarterly (3 Months)</option>
                  <option value="semi-annually">
                    Semi Annually (6 Months)
                  </option>
                  <option value="annually">Annually (12 Months)</option>
                </select>
              </div>

              <div>Amount: ${amount}</div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Payment Receipt
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer transition"
                />
              </div>

              <button disabled = {loading} onClick={handleSubmit} className="w-full bg-customPink text-white font-semibold py-2.5 rounded-lg transition hover:bg-pink-600 mx-auto flex justify-center items-center">
                {loading ? <Loader /> : "Submit Receipt"}
              </button>
            </div>
          </div>
        )}

        {wallets.map((wallet, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              {wallet.icon}
              <div>
                <p className="font-semibold text-gray-800">{wallet.name}</p>
                <p className="text-sm text-gray-500 break-all">
                  {wallet.address}
                </p>
              </div>
            </div>
            <button
              className="px-3 py-1 text-sm rounded-lg bg-pink-500 text-white hover:bg-pink-600"
              onClick={() => handleCopy(wallet.address)}
            >
              Copy
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowModal(!showModal)}
        className="bg-customPink mt-4 p-4"
      >
        Upload receipt
      </button>

      {/* Toast Alert */}
      {copied && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="h-5 w-5" />
          <span>Copied!</span>
        </div>
      )}
    </div>
  );
};

export default EscortCryptoPay;
