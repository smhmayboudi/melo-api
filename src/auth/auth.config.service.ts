import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ms from "ms";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";

@Injectable()
export class AuthConfigService implements AuthConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get jwtAccessTokenExpiresCount(): number {
    return this.configService.get<number>("auth.jwtAccessTokenExpiresCount", 0);
  }

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
