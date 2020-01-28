import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "../user/user.service";
import { AuthJwtPayloadDto } from "./dto/auth.jwt-payload.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      passReqToCallback: false,
      passwordField: "password",
      session: false,
      usernameField: "username"
    });
  }

  async validate(
    username: string,
    _password: string
  ): Promise<AuthJwtPayloadDto> {
    const userEntity = await this.userService.findOneByUsernam(username);
    if (userEntity === undefined) {
      throw new UnauthorizedException();
    }
    return {
      exp: 0,
      iat: 0,
      jti: "0",
      sub: userEntity.id.toString()
    };
  }
}
