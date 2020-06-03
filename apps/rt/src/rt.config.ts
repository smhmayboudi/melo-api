import { RT } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(RT, () => ({
  TYPEORM_DATABASE: process.env.RT_TYPEORM_DATABASE,
  TYPEORM_HOST: process.env.RT_TYPEORM_HOST,
  TYPEORM_LOGGING: process.env.RT_TYPEORM_LOGGING,
  TYPEORM_PASSWORD: process.env.RT_TYPEORM_PASSWORD,
  TYPEORM_PORT: process.env.RT_TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE: process.env.RT_TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME: process.env.RT_TYPEORM_USERNAME,
}));
