import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { format } from "date-fns";
import { toast } from 'react-toastify';

const EscortCreateBooking = () => {
  const { api } = useContext(UserContext);
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [availabilitySlots, setAvailabilitySlots] = useState([]);

  const createSlot = async () => {
    try {
      const payload = {
        date,
        slots: [
          {
            start: from,
            end: to,
            isBooked: false,
          },
        ],
      };

      const res = await api.post("escorts/availability", payload);

      getAvailability();
      // alert(res.data.message);
      toast.success(res.data.message, {
        autoClose: 3000,
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const getAvailability = async () => {
    try {
      const res = await api.get("escorts/get/availability");
      setAvailabilitySlots(res.data.availability);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAvailability();
  }, []);

  return (
    <div className="bg-pink-100 pt-6 rounded-xl p-6 flex flex-col gap-6 h-lvh shadow-sm">
      <p className="text-sm font-medium text-gray-700 text-center">
        Select a time and date you'll be available to be booked
      </p>

      <div className="flex flex-col gap-4">
        <input
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="w-full rounded-lg border border-pink-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customPink"
        />

        <div className="flex gap-4">
          <div className="flex flex-col w-full gap-1">
            <label className="text-xs font-medium text-gray-600">From</label>
            <input
              onChange={(e) => setFrom(e.target.value)}
              type="time"
              className="rounded-lg border border-pink-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customPink"
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-xs font-medium text-gray-600">To</label>
            <input
              onChange={(e) => setTo(e.target.value)}
              type="time"
              className="rounded-lg border border-pink-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-customPink"
            />
          </div>
        </div>
      </div>

      <button
        onClick={createSlot}
        className="w-full py-3 bg-customPink text-white text-sm font-semibold rounded-lg hover:bg-customPink/90 transition-colors disabled:bg-customPink/20 mx-auto flex items-center justify-center"
      >
        Create Slot
      </button>

      {/* Available slots */}
      <div className="mt-8">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">
          Slots Available (24 hr Clock)
        </h1>

        <div className="grid gap-4">
          {availabilitySlots.map((slot, index) => {
            // const firstSlot = slot.slots[0];

            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-pink-100 p-4 shadow-sm hover:shadow-md transition"
              >
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {format(new Date(slot.date), "EEEE, do MMMM yyyy")}
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-customPink text-sm font-semibold">
                  <span>{slot.slots[0].start}</span>
                  <span>-</span>
                  <span>{slot.slots[0].end}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EscortCreateBooking;
