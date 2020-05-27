import { AUTH } from "@melo/common";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class AuthConfigService implements AuthConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get jwtAccessTokenExpiresCount(): number {
    return this.configService.get<number>(
      `${AUTH}.jwtAccessTokenExpiresCount`,
      0
    );
  }

  get jwtAccessTokenExpiresIn(): number {
    return ms(
      this.configService.get<string>(`${AUTH}.jwtAccessTokenExpiresIn`, "0")
    );
  }

  get jwtAuhSchema(): string {
    return this.configService.get<string>(`${AUTH}.jwtAuhSchema`, "");
  }

  get jwtRefreshTokenExpiresIn(): number {
    return ms(
      this.configService.get<string>(`${AUTH}.jwtRefreshTokenExpiresIn`, "0")
    );
  }

  get telegramBotToken(): string {
    return this.configService.get<string>(`${AUTH}.telegramBotToken`, "");
  }

  get telegramQueryExpiration(): number {
    return ms(
      this.configService.get<string>(`${AUTH}.telegramQueryExpiration`, "0")
    );
  }
}
