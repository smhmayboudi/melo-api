import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { TelegramStrategy as Strategy } from "passport-telegram-official";
import { AuthConfigService } from "./auth.config.service";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./type/JwtPayload";
import { TelegramPayload } from "./type/TelegramPayload";

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

  async validate(telegramPayload: TelegramPayload): Promise<JwtPayload> {
    const payload = await this.authService.telegram(telegramPayload.id);
    if (payload !== undefined) {
      return payload;
    }
    throw new UnauthorizedException();
  }
}
