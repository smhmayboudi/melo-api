import { registerAs } from "@nestjs/config";

export default registerAs("user", () => ({
  test: process.env.USER_TEST
}));
