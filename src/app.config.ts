import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  test: process.env.APP_TEST
}));
