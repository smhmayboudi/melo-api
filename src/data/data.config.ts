import { registerAs } from "@nestjs/config";

export default registerAs("data", () => ({
  timeout: process.env.DATA_TIMEOUT,
  uri: process.env.DATA_URI
}));
