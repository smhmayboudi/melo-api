import { EMOTION } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(EMOTION, () => ({
  elasticNode: process.env.EMOTION_ELASTICSEARCH_NODE,
  indexName: process.env.EMOTION_INDEX_NAME,
  maxSize: process.env.EMOTION_MAX_SIZE,
}));
