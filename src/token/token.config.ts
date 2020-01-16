import { registerAs } from "@nestjs/config";

export default registerAs("token", () => ({
  cacheHost: process.env.KEY_TEST
}));
