import { registerAs } from "@nestjs/config";

export default registerAs("emotion", () => ({
  timeout: process.env.EMOTION_TIMEOUT,
  url: process.env.EMOTION_URL
}));
