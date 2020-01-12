import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { IUser } from "../user/type/IUser";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      passwordField: "password",
      usernameField: "username"
    });
  }

  async validate(username: string, password: string): Promise<IUser> {
    const user = await this.authService.local(username, password);
    if (user === undefined) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
