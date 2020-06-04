import { AUTH, JWT_REFRESH_TOKEN_EXPIRES_IN } from "@melo/common";

import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class AuthConfigService implements AuthConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get jwtRefreshTokenExpiresIn(): number {
    return ms(
      this.configService.get<string>(
        `${AUTH}.${JWT_REFRESH_TOKEN_EXPIRES_IN}`,
        "0"
      )
    );
  }
}
