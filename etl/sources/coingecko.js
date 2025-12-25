import axios from "axios";
export async function fetchCG() {
  const r=await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
  return r.data;
}
