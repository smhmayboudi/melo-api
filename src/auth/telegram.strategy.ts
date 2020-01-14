import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { TelegramStrategy as Strategy } from "passport-telegram-official";
import { User } from "../user/type/User";
import { AuthService } from "./auth.service";
import { TelegramPayload } from "./type/TelegramPayload";
import { AuthConfigService } from "./auth.config.service";

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly authConfigService: AuthConfigService,
    private readonly authService: AuthService
  ) {
    super({
      botToken: authConfigService.telegramBotToken,
      passReqToCallback: false,
      queryExpiration: authConfigService.telegramQueryExpiration
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
