import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1000,
  max: 5
});

app.use(limiter);
