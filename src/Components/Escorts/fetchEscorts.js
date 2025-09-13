import axios from "axios";
import { baseUrl } from "../../baseUrl";

export const fetchEscorts = async (page = 1, limit = 10, filters = {}) => {
  // build query string
  const queryParams = new URLSearchParams({
    page,
    limit,
    ...filters,
  }).toString();

  const res = await axios.get(`${baseUrl}escorts?${queryParams}`);
  return res.data; // if error happens, it will throw and be caught in loadEscorts
};