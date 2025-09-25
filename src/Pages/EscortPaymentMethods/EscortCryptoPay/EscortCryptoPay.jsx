import React, { useState } from "react";
import {
  Bitcoin,
  Wallet,
  CircleDollarSign,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

const EscortCryptoPay = () => {
  const [copied, setCopied] = useState("");

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

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(address);

    setTimeout(() => setCopied(""), 2000); // hide after 2s
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

      <button className="bg-customPink mt-4 p-4">Upload result</button>

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
