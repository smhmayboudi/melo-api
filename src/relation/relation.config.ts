import { registerAs } from "@nestjs/config";

export default registerAs("relation", () => ({
  timeout: process.env.RELATION_TIMEOUT,
  uri: process.env.RELATION_URL
}));
