import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => ({
  jwtSecret: process.env.AUTH_JWT_SECRET,
  jwtSignOptionsExpiresIn: process.env.AUTH_JWT_SIGN_OPTIONS_EXPIREES_IN
}));
