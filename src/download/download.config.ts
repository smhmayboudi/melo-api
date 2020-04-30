import { registerAs } from "@nestjs/config";

export default registerAs("download", () => ({
  elasticNode: process.env.DOWNLOAD_ELASTIC_NODE,
  index: process.env.DOWNLOAD_INDEX_NAME,
  requestLimit: process.env.DOWNLOAD_REQUEST_LIMIT,
}));
