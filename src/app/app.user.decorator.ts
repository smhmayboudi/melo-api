import { createParamDecorator } from "@nestjs/common";

export const AppUser = createParamDecorator((data, req) =>
  data === undefined ? req.user : req.user !== undefined && req.user[data]
);
