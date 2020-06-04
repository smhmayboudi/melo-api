import { AUTH } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(AUTH, () => ({
  JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRES_IN,
}));
