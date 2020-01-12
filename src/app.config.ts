import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  botToken: process.env.APP_BOT_TOKEN
}));
