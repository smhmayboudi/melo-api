import { EMOTION } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(EMOTION, () => ({
  ELASTICSEARCH_NODE: process.env.EMOTION_ELASTICSEARCH_NODE,
  INDEX_NAME: process.env.EMOTION_INDEX_NAME,
  MAX_SIZE: process.env.EMOTION_MAX_SIZE,
  SERVICE_PORT: process.env.EMOTION_SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS: process.env.EMOTION_SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY: process.env.EMOTION_SERVICE_RETRY_DELAY,
  SERVICE_URL: process.env.EMOTION_SERVICE_URL,
}));
