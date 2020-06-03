import { USER } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(USER, () => ({
  TYPEORM_DATABASE: process.env.USER_TYPEORM_DATABASE,
  TYPEORM_HOST: process.env.USER_TYPEORM_HOST,
  TYPEORM_LOGGING: process.env.USER_TYPEORM_LOGGING,
  TYPEORM_PASSWORD: process.env.USER_TYPEORM_PASSWORD,
  TYPEORM_PORT: process.env.USER_TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE: process.env.USER_TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME: process.env.USER_TYPEORM_USERNAME,
}));
