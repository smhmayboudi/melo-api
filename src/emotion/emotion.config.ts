import { registerAs } from "@nestjs/config";

export default registerAs("emotion", () => ({
  elasticNode: process.env.EMOTION_ELASTIC_NODE,
  index: process.env.EMOTION_INDEX_NAME,
  resultSize: process.env.EMOTION_RESULT_SIZE,
}));
