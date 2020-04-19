import { registerAs } from "@nestjs/config";

export default registerAs("data", () => ({
  timeout: process.env.DATA_TIMEOUT,
  url: process.env.DATA_URL,
}));
