import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  port: process.env.APP_PORT,
  rateLimitMax: process.env.APP_RATE_LIMIIT_MAX,
  rateLimitWindowMs: process.env.APP_RATEL_IMIIT_WINDOWMS
}));
