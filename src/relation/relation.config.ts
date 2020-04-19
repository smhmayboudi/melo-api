import { registerAs } from "@nestjs/config";

export default registerAs("relation", () => ({
  timeout: process.env.RELATION_TIMEOUT,
  url: process.env.RELATION_URL,
}));
