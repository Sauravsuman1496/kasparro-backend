
async function waitForDb(retries = 10) {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return;
    } catch {
      console.log("Waiting for DB...");
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  throw new Error("DB not ready after retries");
}



import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchCoins() {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd");
  const data = await res.json();

  return [
    { symbol: "btc", price: data.bitcoin.usd },
    { symbol: "eth", price: data.ethereum.usd },
    { symbol: "usdt", price: data.tether.usd },
  ];
}

async function run() {
  console.log("ETL started");
  await waitForDb(); 

  const coins = await fetchCoins();

  let rows = 0;

  for (const c of coins) {
    await prisma.rawCoin.create({
      data: {
        source: "coingecko",
        symbol: c.symbol,
        price: c.price,
      },
    });

    await prisma.coin.upsert({
      where: { symbol: c.symbol },
      update: {
        price: c.price,
        updatedAt: new Date(),
      },
      create: {
        symbol: c.symbol,
        price: c.price,
        updatedAt: new Date(),
      },
    });

    rows++;
  }

  await prisma.etlRun.create({
    data: {
      status: "success",
      rowsAdded: rows,
    },
  });

  console.log("ETL finished:", rows, "rows");
}

run()
  .catch(async (e) => {
    console.error("ETL failed:", e.message);
    await prisma.etlRun.create({
      data: {
        status: "failed",
        rowsAdded: 0,
      },
    });
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
