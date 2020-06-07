import { RELATION } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(RELATION, () => ({
  DGRAPH_ADDRESS: process.env.RELATION_DGRAPH_ADDRESS,
  DGRAPH_DEBUG: process.env.RELATION_DGRAPH_DEBUG,
}));
