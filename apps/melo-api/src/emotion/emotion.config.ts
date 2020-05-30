import { EMOTION } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(EMOTION, () => ({
  ELASTICSEARCH_NODE: process.env.EMOTION_ELASTICSEARCH_NODE,
  INDEX_NAME: process.env.EMOTION_INDEX_NAME,
  MAX_SIZE: process.env.EMOTION_MAX_SIZE,
}));
