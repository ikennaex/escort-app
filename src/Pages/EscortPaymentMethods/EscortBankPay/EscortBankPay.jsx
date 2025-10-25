import React from "react";
import { useState, useEffect } from "react";
import { baseUrl } from "../../../baseUrl";
import axios from "axios";
import ManualCheckout from "../../../Components/ManualCheckout/ManualCheckout";

const EscortBankPay = () => {
  const [amount, setAmount] = useState(null);
  const [rates, setRates] = useState({});
  const [plan, setPlan] = useState("");

  const fetchRates = async () => {
    try {
      const response = await axios.get(`${baseUrl}escorts/premium/rates`);
      setRates(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
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

  return (
    <div className="min-h-screen bg-pink-100 flex justify-center items-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8 border border-pink-200">
        <h1 className="text-2xl font-bold text-customPink mb-6 text-center">
          Escort Bank Payment
        </h1>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="duration"
              className="block mb-2 text-gray-700 font-medium"
            >
              Select duration
            </label>
            <select
              onChange={handleSelect}
              name="duration"
              id="duration"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-customPink focus:outline-none"
              required
            >
              <option value="">Choose a duration</option>
              <option value="weekly">Weekly (1 Week)</option>
              <option value="biweekly">Biweekly (2 Weeks)</option>
              <option value="monthly">Monthly (1 Month)</option>
              <option value="quarterly">Quarterly (3 Months)</option>
              <option value="semi-annually">Semi Annually (6 Months)</option>
              <option value="annually">Annually (12 Months)</option>
            </select>
          </div>

          <div className="flex items-center justify-between bg-pink-50 border border-pink-200 rounded-lg px-4 py-3">
            <p className="text-gray-700 font-medium">Amount:</p>
            <p className="font-semibold text-lg text-customPink">
              {amount ? `NGN ${amount}` : "---"}
            </p>
          </div>

          {/* Payment Instructions */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-5 mt-6">
            <h2 className="text-lg font-semibold text-customPink mb-3">
              Payment Instructions
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
              <li>
                Make a bank transfer to the account below using the names on your BANK ACCOUNT as the payment reference.
              </li>
              <li>
                Ensure you send the{" "}
                <span className="font-semibold text-customPink">
                  exact amount
                </span>{" "}
                displayed above to avoid delays in verification.
              </li>
              <li>
                After payment, upload your receipt using the form below to
                confirm your transaction.
              </li>
              <li>
                Once verified, your premium escort plan will be activated within
                <span className="font-semibold"> 2 hours</span>.
              </li>
            </ol>

            <p className="mt-4 text-sm text-red-500 font-medium border-t border-pink-200 pt-3">
              ⚠️ Submitting a fake or altered receipt will result in immediate
              account deactivation.
            </p>
          </div>

          <div className="mt-8">
            <ManualCheckout amount={amount} plan = {plan} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscortBankPay;
