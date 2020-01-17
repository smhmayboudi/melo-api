import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwtAccessTokenExpiresIn(): string {
    return this.configService.get<string>("auth.jwtAccessTokenExpiresIn", "1d");
  }

  get jwtAuhSchema(): string {
    return this.configService.get<string>("auth.jwtAuhSchema", "jwt");
  }

  get jwtRefreshTokenExpiresIn(): string {
    return this.configService.get<string>(
      "auth.jwtRefreshTokenExpiresIn",
      "5m"
    );
  }

  get telegramBotToken(): string {
    return this.configService.get<string>("auth.telegramBotToken", "telegram");
  }

  get telegramQueryExpiration(): number {
    return this.configService.get<number>(
      "auth.telegramQueryExpiration",
      86400
    );
  }
}
