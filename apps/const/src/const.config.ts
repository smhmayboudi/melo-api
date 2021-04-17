import { CONST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(CONST, () => ({
  IMAGE_BASE_URL: process.env.CONST_IMAGE_BASE_URL,
  IMAGE_ENCODE: process.env.CONST_IMAGE_ENCODE,
  IMAGE_KEY: process.env.CONST_IMAGE_KEY,
  IMAGE_SALT: process.env.CONST_IMAGE_SALT,
  IMAGE_SIGNATURE_SIZE: process.env.CONST_IMAGE_SIGNATURE_SIZE,
  IMAGE_TYPE_SIZE: process.env.CONST_IMAGE_TYPE_SIZE,
  SERVICE_PORT: process.env.CONST_SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS: process.env.CONST_SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY: process.env.CONST_SERVICE_RETRY_DELAY,
  SERVICE_URL: process.env.CONST_SERVICE_URL,
  STATIC_IMAGE_PATHS: process.env.CONST_STATIC_IMAGE_PATHS,
}));
