import { CONST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(CONST, () => ({
  STATIC_IMAGE_PATHS: process.env.CONST_STATIC_IMAGE_PATHS,
}));
