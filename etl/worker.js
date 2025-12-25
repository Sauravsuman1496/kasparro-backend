import { PrismaClient } from "@prisma/client";

import {fetchCG} from "./sources/coingecko.js";
import {fetchCP} from "./sources/coinpaprika.js";

const prisma=new PrismaClient();

async function run(){
  const cg=await fetchCG();
  const cp=await fetchCP();

  for(const r of cg){
    await prisma.rawCoin.create({data:{source:"coingecko",symbol:r.symbol,price:r.current_price}});
    await prisma.coin.upsert({
      where:{symbol:r.symbol},
      update:{price:r.current_price,updatedAt:new Date()},
      create:{symbol:r.symbol,price:r.current_price,updatedAt:new Date()}
    });
  }
  for(const r of cp){
    await prisma.rawCoin.create({data:{source:"coinpaprika",symbol:r.symbol,price:r.quotes.USD.price}});
  }
}

run();
