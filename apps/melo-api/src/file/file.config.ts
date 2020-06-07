import { FILE } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(FILE, () => ({
  CACHE_HOST: process.env.FILE_CACHE_HOST,
  CACHE_MAX: process.env.FILE_CACHE_MAX,
  CACHE_PORT: process.env.FILE_CACHE_PORT,
  CACHE_STORE: process.env.FILE_CACHE_STORE,
  CACHE_TTL: process.env.FILE_CACHE_TTL,
}));
