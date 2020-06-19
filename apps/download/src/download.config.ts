import { DOWNLOAD } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(DOWNLOAD, () => ({
  ELASTICSEARCH_NODE: process.env.DOWNLOAD_ELASTICSEARCH_NODE,
  INDEX_NAME: process.env.DOWNLOAD_INDEX_NAME,
  MAX_SIZE: process.env.DOWNLOAD_MAX_SIZE,
  SERVICE_PORT: process.env.DOWNLOAD_SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS: process.env.DOWNLOAD_SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY: process.env.DOWNLOAD_SERVICE_RETRY_DELAY,
  SERVICE_URL: process.env.DOWNLOAD_SERVICE_URL,
}));
