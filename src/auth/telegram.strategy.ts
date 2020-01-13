import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { TelegramStrategy as Strategy } from "passport-telegram-official";
import { IUser } from "../user/type/IUser";
import { AuthService } from "./auth.service";
import { TelegramPayload } from "./type/TelegramPayload";
import { AppConfigService } from "../app.config.service";

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly appConfigService: AppConfigService,
    private readonly authService: AuthService
  ) {
    super({
      botToken: appConfigService.botToken
    });
  }

  async validate(payload: TelegramPayload): Promise<IUser> {
    const user = await this.authService.telegram(payload.id);
    if (user === undefined) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
