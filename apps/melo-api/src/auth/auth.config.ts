import { AUTH } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(AUTH, () => ({
  jwtAccessTokenExpiresCount: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIREES_COUNT,
  jwtAccessTokenExpiresIn: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIREES_IN,
  jwtAuhSchema: process.env.AUTH_JWT_AUTH_SCHEMA,
  jwtRefreshTokenExpiresIn: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIREES_IN,
  telegramBotToken: process.env.AUTH_TELEGRAM_BOT_TOKEN,
  telegramQueryExpiration: process.env.AUTH_TELEGRAM_QUERY_EXPIRATION,
}));
