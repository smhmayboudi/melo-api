import { AT } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(AT, () => ({
  SERVICE_PORT: process.env.AT_SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS: process.env.AT_SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY: process.env.AT_SERVICE_RETRY_DELAY,
  SERVICE_URL: process.env.AT_SERVICE_URL,
  TYPEORM_DATABASE: process.env.AT_TYPEORM_DATABASE,
  TYPEORM_HOST: process.env.AT_TYPEORM_HOST,
  TYPEORM_LOGGING: process.env.AT_TYPEORM_LOGGING,
  TYPEORM_PASSWORD: process.env.AT_TYPEORM_PASSWORD,
  TYPEORM_PORT: process.env.AT_TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE: process.env.AT_TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME: process.env.AT_TYPEORM_USERNAME,
}));
