import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { TelegramStrategy as Strategy } from "passport-telegram-official";
import { User } from "../user/type/User";
import { AuthService } from "./auth.service";
import { TelegramPayload } from "./type/TelegramPayload";

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      botToken: "520526310:AAHBhSmt26hE71hP6ZKzrV7LFrQUtSOPYRc"
    });
  }

  async validate(payload: TelegramPayload): Promise<User> {
    const user = await this.authService.telegram(payload.id);
    if (user === undefined) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
