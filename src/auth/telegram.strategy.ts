import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { TelegramStrategy as Strategy } from "passport-telegram-official";
import { UserService } from "../user/user.service";
import { AuthConfigService } from "./auth.config.service";
import { AuthJwtPayloadDto } from "./dto/auth.jwt-payload.dto";
import { AuthTelegramPayloadDto } from "./dto/auth.telegram-payload.dto";

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly authConfigService: AuthConfigService,
    private readonly userService: UserService
  ) {
    super({
      botToken: authConfigService.telegramBotToken,
      passReqToCallback: false,
      queryExpiration: authConfigService.telegramQueryExpiration / 1000
    });
  }

  async validate(dto: AuthTelegramPayloadDto): Promise<AuthJwtPayloadDto> {
    const userEntity = await this.userService.findOneByTelegramId(dto.id);
    if (userEntity === undefined) {
      // throw new UnauthorizedException();
      const newUserEntity = await this.userService.save({
        id: 0,
        // avatar?: string,
        // biography?: string,
        // birthday?: Date,
        // cellphone?: string,
        // email?: string,
        // firstname?: string,
        // gender?: Gender,
        // language_code?: string,
        // lastname?: string,
        // registered_date?: Date,
        telegram_id: dto.id
        // username?: string
      });
      return {
        exp: 0,
        iat: 0,
        jti: "0",
        sub: newUserEntity.id.toString()
      };
    }
    return {
      exp: 0,
      iat: 0,
      jti: "0",
      sub: userEntity.id.toString()
    };
  }
}
