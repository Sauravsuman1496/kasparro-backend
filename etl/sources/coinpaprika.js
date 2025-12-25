import axios from "axios";

export async function fetchCP(){

  const headers = {};

  if (process.env.COINPAPRIKA_KEY && process.env.COINPAPRIKA_KEY.length > 0) {
    headers["Authorization"] = `Bearer ${process.env.COINPAPRIKA_KEY}`;
  }

  const r = await axios.get(
    `${process.env.COINPAPRIKA_API_URL}/tickers`,
    { headers }
  );

  return r.data;
}
