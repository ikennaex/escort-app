import React from "react";
import { useState } from "react";
import { baseUrl } from "../../../baseUrl";
import { useEffect } from "react";
import axios from "axios";
import Checkout from "../Checkout";

const EscortBankPay = () => {
  const [amount, setAmount] = useState(null);
  const [rates, setRates] = useState({});
  const [plan, setPlan] = useState("")

  const fetchRates = async () => {
    try {
      const response = await axios.get(`${baseUrl}escorts/premium/rates`);
      setRates(response.data);
      console.log(response)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleSelect = (e) => {
    const selected = e.target.value;
    setPlan(selected)
    setAmount(rates?.[selected] || null);
  };

  return (
    <div className="h-screen bg-pink-100 p-2">
      <form className="mt-2 space-y-4" action="">
        <div>
          <label
            htmlFor="duration"
            className="block mb-1 font-medium text-gray-700"
          >
            Select duration
          </label>
          <select
            onChange={handleSelect}
            name="duration"
            id="duration"
            className="w-full border rounded-md p-2 "
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

        <div className="flex items-center gap-2">
          <p className="text-gray-700">Amount:</p>
          <p className="font-semibold text-lg text-gray-900">
            {amount ? `NGN ${amount}` : "---"}
          </p>
        </div>

        <Checkout amount = {amount} plan={plan}/>

        {/* <button
        disabled = {!amount}
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 flex mx-auto mt-10 transition disabled:bg-blue-700/50"
        >
          Proceed to Payment
        </button> */}
      </form>
    </div>
  );
};

export default EscortBankPay;
