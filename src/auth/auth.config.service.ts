import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ms from "ms";

@Injectable()
export class AuthConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwtAccessTokenExpiresIn(): number {
    return ms(
      this.configService.get<string>("auth.jwtAccessTokenExpiresIn", "0")
    );
  }

  get jwtAuhSchema(): string {
    return this.configService.get<string>("auth.jwtAuhSchema", "");
  }

  get jwtRefreshTokenExpiresIn(): number {
    return ms(
      this.configService.get<string>("auth.jwtRefreshTokenExpiresIn", "0")
    );
  }

  get telegramBotToken(): string {
    return this.configService.get<string>("auth.telegramBotToken", "");
  }

  get telegramQueryExpiration(): number {
    return ms(
      this.configService.get<string>("auth.telegramQueryExpiration", "0")
    );
  }
}
