import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Payload } from "./type/Payload";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      passReqToCallback: false,
      passwordField: "password",
      session: false,
      usernameField: "username"
    });
  }

  async validate(username: string, password: string): Promise<Payload> {
    const payload = await this.authService.local(username, password);
    if (payload !== undefined) {
      return payload;
    }
    throw new UnauthorizedException();
  }
}
