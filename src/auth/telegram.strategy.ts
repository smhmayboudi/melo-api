import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { TelegramStrategy as Strategy } from "passport-telegram-official";
import { AuthConfigService } from "./auth.config.service";
import { AuthService } from "./auth.service";
import { Payload } from "./type/Payload";
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

  async validate(telegramPayload: TelegramPayload): Promise<Payload> {
    const payload = await this.authService.telegram(telegramPayload.id);
    if (payload === undefined) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
