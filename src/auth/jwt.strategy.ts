import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IUser } from "../user/type/IUser";
import { AuthConfigService } from "./auth.config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly authConfigService: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfigService.jwtSecret()
    });
  }

  async validate(payload: IUser): Promise<IUser> {
    return Promise.resolve({
      password: "",
      userId: payload.userId,
      username: payload.username
    });
  }
}
