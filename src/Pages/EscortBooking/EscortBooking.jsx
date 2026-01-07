import React, { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useClientAuth } from "../../Contexts/ClientAuthContext";
import { toast } from "react-toastify";

const EscortBooking = () => {
  const { id } = useParams();

  const [escort, setEscort] = useState({});
  const [loading, setLoading] = useState(false);
  const { api } = useClientAuth();
  const navigate = useNavigate();
  console.log(api);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "",
    phoneNumber: "",
    message: "",
  });

  const fetchEscort = async () => {
    try {
      const response = await axios.get(`${baseUrl}escorts/${id}`);
      setEscort(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEscort();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(`${baseUrl}client/booking`, {
        escort: id,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
      });

      toast.success("Booking Created Succesfully", {
        autoClose: 3000,
        position: "top-right",
      });
      setFormData({
        date: "",
        time: "",
        duration: "",
        phoneNumber: "",
        message: "",
      });
      navigate("/client/bookings");
    } catch (err) {
      console.log(err);
      toast.error("Error Booking Escort", {
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-pink-100 pt-6 rounded-xl p-6 flex flex-col gap-6 shadow-sm  mx-auto">
      <div className="flex flex-col items-center gap-3 text-center">
        {escort?.gallery?.length > 0 && (
          <img
            src={escort.gallery[0]}
            alt={escort.displayName || "Escort"}
            className="w-24 h-24 rounded-full object-cover border-2 border-customPink"
          />
        )}

        <p>
          Booking{" "}
          <span className="text-customPink font-semibold">
            {escort.displayName}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="p-3 rounded-lg border"
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="p-3 rounded-lg border"
        />

        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="p-3 rounded-lg border"
        >
          <option value="">Select duration</option>
          <option value="shorttime">Short time</option>
          <option value="overnight">Overnight</option>
          <option value="weekend">Weekend</option>
        </select>

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="p-3 rounded-lg border"
        />

        <textarea
          name="message"
          placeholder="Additional message (optional)"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="p-3 rounded-lg border resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-customPink text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          {loading ? "Sending..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default EscortBooking;
