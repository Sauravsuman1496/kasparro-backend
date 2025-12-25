import {fetchCP} from "../etl/sources/coinpaprika.js";

test("CoinPaprika auth header present when key set", async ()=>{
  process.env.COINPAPRIKA_KEY="testkey123";
  const spy = jest.spyOn(require("axios"),"get");
  await fetchCP();
  expect(spy.mock.calls[0][1].headers.Authorization).toContain("testkey123");
});
