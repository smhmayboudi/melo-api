import { AT } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(AT, () => ({
  TYPEORM_DATABASE: process.env.AT_TYPEORM_DATABASE,
  TYPEORM_HOST: process.env.AT_TYPEORM_HOST,
  TYPEORM_LOGGING: process.env.AT_TYPEORM_LOGGING,
  TYPEORM_PASSWORD: process.env.AT_TYPEORM_PASSWORD,
  TYPEORM_PORT: process.env.AT_TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE: process.env.AT_TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME: process.env.AT_TYPEORM_USERNAME,
}));
