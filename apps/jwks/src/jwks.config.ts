import { JWKS } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(JWKS, () => ({
  TYPEORM_DATABASE: process.env.JWKS_TYPEORM_DATABASE,
  TYPEORM_HOST: process.env.JWKS_TYPEORM_HOST,
  TYPEORM_LOGGING: process.env.JWKS_TYPEORM_LOGGING,
  TYPEORM_PASSWORD: process.env.JWKS_TYPEORM_PASSWORD,
  TYPEORM_PORT: process.env.JWKS_TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE: process.env.JWKS_TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME: process.env.JWKS_TYPEORM_USERNAME,
}));
