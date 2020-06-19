import { ACTION } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(ACTION, () => ({
  SERVICE_PORT: process.env.ACTION_SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS: process.env.ACTION_SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY: process.env.ACTION_SERVICE_RETRY_DELAY,
  SERVICE_URL: process.env.ACTION_SERVICE_URL,
}));
