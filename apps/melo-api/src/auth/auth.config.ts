import { AUTH } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(AUTH, () => ({
  JWT_ACCESS_TOKEN_EXPIRES_COUNT:
    process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRES_COUNT,
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_AUTH_SCHEMA: process.env.AUTH_JWT_AUTH_SCHEMA,
  TELEGRAM_BOT_TOKEN: process.env.AUTH_TELEGRAM_BOT_TOKEN,
  TELEGRAM_QUERY_EXPIRATION: process.env.AUTH_TELEGRAM_QUERY_EXPIRATION,
}));
