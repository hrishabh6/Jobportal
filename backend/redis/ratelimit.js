import { Ratelimit } from "@upstash/ratelimit";
import redis from "./redis.js";


const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "60s"), 
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return res.status(429).json({ error: "Too many requests. Slow down!" });
    }

    next();
  } catch (error) {
    console.error("Rate limiting error:", error);
    next(); 
  }
};

export default rateLimiterMiddleware;
