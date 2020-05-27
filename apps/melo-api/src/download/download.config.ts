import { DOWNLOAD } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(DOWNLOAD, () => ({
  elasticNode: process.env.DOWNLOAD_ELASTICSEARCH_NODE,
  indexName: process.env.DOWNLOAD_INDEX_NAME,
  maxSize: process.env.DOWNLOAD_MAX_SIZE,
}));
