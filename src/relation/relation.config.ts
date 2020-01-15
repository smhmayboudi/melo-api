import { registerAs } from "@nestjs/config";

export default registerAs("relation", () => ({
  uri: process.env.RELATION_URI
}));
