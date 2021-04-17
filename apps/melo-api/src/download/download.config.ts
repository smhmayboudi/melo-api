import { DOWNLOAD } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(DOWNLOAD, () => ({
  CACHE_HOST: process.env.DOWNLOAD_CACHE_HOST,
  CACHE_MAX: process.env.DOWNLOAD_CACHE_MAX,
  CACHE_PORT: process.env.DOWNLOAD_CACHE_PORT,
  CACHE_STORE: process.env.DOWNLOAD_CACHE_STORE,
  CACHE_TTL: process.env.DOWNLOAD_CACHE_TTL,
}));
