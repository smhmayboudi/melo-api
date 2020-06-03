import { FILE } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(FILE, () => ({
  TYPEORM_DATABASE: process.env.FILE_TYPEORM_DATABASE,
  TYPEORM_HOST: process.env.FILE_TYPEORM_HOST,
  TYPEORM_LOGGING: process.env.FILE_TYPEORM_LOGGING,
  TYPEORM_PASSWORD: process.env.FILE_TYPEORM_PASSWORD,
  TYPEORM_PORT: process.env.FILE_TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE: process.env.FILE_TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME: process.env.FILE_TYPEORM_USERNAME,
}));
