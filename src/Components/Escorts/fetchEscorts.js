import axios from "axios";
import { baseUrl } from "../../baseUrl";

export const fetchEscorts = async (page = 1, limit = 10, filters = {}) => {
  try {
    // build query string
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...filters, // e.g. { location: "Lagos", category: "VIP" }
    }).toString();

    // make request
    const res = await axios.get(`${baseUrl}escorts?${queryParams}`);

    // response contains escorts + pagination info
    return res.data;
  } catch (err) {
    console.error("Error fetching escorts:", err.response?.data || err.message);
    return null;
  }
};