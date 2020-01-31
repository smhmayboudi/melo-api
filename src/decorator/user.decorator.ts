import { createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((data: string | undefined, req) => {
  return data === undefined
    ? req.user
    : req.user !== undefined && req.user[data];
});
