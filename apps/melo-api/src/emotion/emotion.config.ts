import { EMOTION } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(EMOTION, () => ({
  CACHE_HOST: process.env.EMOTION_CACHE_HOST,
  CACHE_MAX: process.env.EMOTION_CACHE_MAX,
  CACHE_PORT: process.env.EMOTION_CACHE_PORT,
  CACHE_STORE: process.env.EMOTION_CACHE_STORE,
  CACHE_TTL: process.env.EMOTION_CACHE_TTL,
}));
