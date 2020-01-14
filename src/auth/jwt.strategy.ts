import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../user/type/User";
import { AuthConfigService } from "./auth.config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly authConfigService: AuthConfigService) {
    super({
      algorithms: ["RS256"],
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(
        authConfigService.jwtAuhSchema
      ),
      passReqToCallback: false,
      secretOrKey: `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyXWOVb+Spd8bRQW9xU2/dGYiL
uWgGBB6kz8djELxIZM46bDPZFkCJtVLLMcXFpfZS7hbdoPqYDvG3Z59leAwK5Mqi
pcvL/EFpp8cUYiN0m7eUb4D6l5gOcJn5fIOVKr6aKaP6zMVlqHTDqV8oQsLr2izl
hWM/dSPAs1wwn6LZTQIDAQAB
-----END PUBLIC KEY-----
`
    });
  }

  async validate(payload: User): Promise<User> {
    return Promise.resolve({
      password: "",
      userId: payload.userId,
      username: payload.username
    });
  }
}
