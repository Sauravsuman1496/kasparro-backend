router.get("/data", async (req, res) => {
  const { symbol, limit = 20, offset = 0 } = req.query;

  const where = symbol ? { symbol: symbol.toLowerCase() } : {};

  const coins = await prisma.coin.findMany({
    where,
    take: Number(limit),
    skip: Number(offset),
    orderBy: { updatedAt: "desc" }
  });

  res.json(coins);
});
