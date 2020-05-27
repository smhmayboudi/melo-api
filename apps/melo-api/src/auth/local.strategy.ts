import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AuthStrategyResDto } from "@melo/common";
import { PassportStrategy } from "@nestjs/passport";
// eslint-disable-next-line import/named
import { Strategy } from "passport-local";
import { UserService } from "../user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      passReqToCallback: false,
      passwordField: "password",
      session: false,
      usernameField: "username",
    });
  }

  async validate(
    username: string,
    _password: string
  ): Promise<AuthStrategyResDto> {
    const user = await this.userService.findOneByUsername({ username });
    if (user === undefined) {
      throw new UnauthorizedException();
    }
    return {
      sub: user.id.toString(),
    };
  }
}
