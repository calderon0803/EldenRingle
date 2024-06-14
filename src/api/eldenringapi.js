import axios from "axios";

const ELDENRING_API = "http://eldenring.fanapis.com/api";

const _basicHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
};

export const getBosses = async () => {
  const url = `${ELDENRING_API}/bosses?limit=1000`;

  const res = await axios.get(url, { headers: _basicHeaders });
  return res.data;
};
