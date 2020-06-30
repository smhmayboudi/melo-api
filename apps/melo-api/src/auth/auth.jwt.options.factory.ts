import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

import { AuthConfigService } from "./auth.config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthJwtOptionsFactory implements JwtOptionsFactory {
  constructor(private readonly authConfigService: AuthConfigService) {}

  async createJwtOptions(): Promise<JwtModuleOptions> {
    return Promise.resolve({
      privateKey: "",
      publicKey: "",
      signOptions: {
        algorithm: "RS256",
        expiresIn: this.authConfigService.jwtAccessTokenExpiresIn / 1000,
      },
    });
  }
}
