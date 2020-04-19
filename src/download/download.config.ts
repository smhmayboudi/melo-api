import { registerAs } from "@nestjs/config";

export default registerAs("download", () => ({
  timeout: process.env.DOWNLOAD_TIMEOUT,
  url: process.env.DOWNLOAD_URL,
}));
