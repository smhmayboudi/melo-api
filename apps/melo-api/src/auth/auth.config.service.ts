import {
  AUTH,
  JWT_ACCESS_TOKEN_EXPIRES_COUNT,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_AUTH_SCHEMA,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_QUERY_EXPIRATION,
} from "@melo/common";

import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class AuthConfigService implements AuthConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get jwtAccessTokenExpiresCount(): number {
    return this.configService.get<number>(
      `${AUTH}.${JWT_ACCESS_TOKEN_EXPIRES_COUNT}`,
      0
    );
  }

  get jwtAccessTokenExpiresIn(): number {
    return ms(
      this.configService.get<string>(
        `${AUTH}.${JWT_ACCESS_TOKEN_EXPIRES_IN}`,
        "0"
      )
    );
  }

  get jwtAuhSchema(): string {
    return this.configService.get<string>(`${AUTH}.${JWT_AUTH_SCHEMA}`, "");
  }

  get telegramBotToken(): string {
    return this.configService.get<string>(`${AUTH}.${TELEGRAM_BOT_TOKEN}`, "");
  }

  get telegramQueryExpiration(): number {
    return ms(
      this.configService.get<string>(
        `${AUTH}.${TELEGRAM_QUERY_EXPIRATION}`,
        "0"
      )
    );
  }
}
