import { RELATION } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(RELATION, () => ({
  DGRAPH_ADDRESS: process.env.RELATION_DGRAPH_ADDRESS,
  DGRAPH_DEBUG: process.env.RELATION_DGRAPH_DEBUG,
  SERVICE_PORT: process.env.RELATION_SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS: process.env.RELATION_SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY: process.env.RELATION_SERVICE_RETRY_DELAY,
  SERVICE_URL: process.env.RELATION_SERVICE_URL,
}));
