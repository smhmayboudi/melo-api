import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwtAuhSchema(): string {
    return this.configService.get<string>("auth.jwtAuhSchema", "jwt");
  }

  get jwtSignOptionsExpiresIn(): string {
    return this.configService.get<string>(
      "auth.jwtSignOptionsExpiresIn",
      "60s"
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
