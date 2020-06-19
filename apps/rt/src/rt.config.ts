import { RT } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(RT, () => ({
  SERVICE_PORT: process.env.RT_SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS: process.env.RT_SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY: process.env.RT_SERVICE_RETRY_DELAY,
  SERVICE_URL: process.env.RT_SERVICE_URL,
  TYPEORM_DATABASE: process.env.RT_TYPEORM_DATABASE,
  TYPEORM_HOST: process.env.RT_TYPEORM_HOST,
  TYPEORM_LOGGING: process.env.RT_TYPEORM_LOGGING,
  TYPEORM_PASSWORD: process.env.RT_TYPEORM_PASSWORD,
  TYPEORM_PORT: process.env.RT_TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE: process.env.RT_TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME: process.env.RT_TYPEORM_USERNAME,
}));
