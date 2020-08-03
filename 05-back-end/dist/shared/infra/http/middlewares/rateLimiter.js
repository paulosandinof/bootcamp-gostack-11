"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _ioredis = _interopRequireDefault(require("ioredis"));

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisClient = new _ioredis.default({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS
});
const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  storeType: 'ioredis',
  points: 30,
  duration: 30
});

async function rateLimiter(request, response, next) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw new _AppError.default('Too many requests', 429);
  }
}