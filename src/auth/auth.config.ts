import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => ({
  jwtAuhSchema: process.env.AUTH_JWT_AUTH_SCHEMA,
  jwtSignOptionsExpiresIn: process.env.AUTH_JWT_SIGN_OPTIONS_EXPIREES_IN,
  telegramBotToken: process.env.AUTH_TELEGRAM_BOT_TOKEN,
  telegramQueryExpiration: process.env.AUTH_TELEGRAM_QUERY_EXPIRATION
}));
