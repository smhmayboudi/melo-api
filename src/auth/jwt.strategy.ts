import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthConfigService } from "./auth.config.service";
import { Payload } from "./type/Payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly authConfigService: AuthConfigService) {
    super({
      algorithms: ["RS256"],
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(
        authConfigService.jwtAuhSchema
      ),
      passReqToCallback: false,
      secretOrKey: "privateKey"
    });
  }

  async validate(payload: Payload): Promise<Payload> {
    return Promise.resolve(payload);
  }
}
