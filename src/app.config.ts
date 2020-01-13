import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  botToken: process.env.APP_BOTTOKEN,
  port: process.env.APP_PORT,
  rateLimitMax: process.env.APP_RATELIMIIT_MAX,
  rateLimitWindowMs: process.env.APP_RATELIMIIT_WINDOWMS
}));
