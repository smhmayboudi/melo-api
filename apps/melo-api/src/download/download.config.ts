import { DOWNLOAD } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(DOWNLOAD, () => ({
  ELASTICSEARCH_NODE: process.env.DOWNLOAD_ELASTICSEARCH_NODE,
  INDEX_NAME: process.env.DOWNLOAD_INDEX_NAME,
  MAX_SIZE: process.env.DOWNLOAD_MAX_SIZE,
}));
