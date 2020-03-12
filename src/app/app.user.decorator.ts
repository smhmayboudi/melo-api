import { createParamDecorator, BadRequestException } from "@nestjs/common";

export const AppUser = createParamDecorator((data, req) => {
  if (req.user === undefined) {
    throw new BadRequestException();
  }
  return data === undefined ? req.user : req.user[data];
});
