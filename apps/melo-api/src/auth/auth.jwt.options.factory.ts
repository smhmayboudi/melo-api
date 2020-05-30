import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

import { AuthConfigService } from "./auth.config.service";
import { Injectable } from "@nestjs/common";
import { JwksService } from "../jwks/jwks.service";

@Injectable()
export class AuthJwtOptionsFactory implements JwtOptionsFactory {
  constructor(
    private readonly authConfigService: AuthConfigService,
    private readonly jwksService: JwksService
  ) {}

  async createJwtOptions(): Promise<JwtModuleOptions> {
    const jwks = await this.jwksService.getOneRandom();
    return jwks === undefined
      ? {}
      : {
          privateKey: jwks.private_key,
          publicKey: jwks.public_key,
          signOptions: {
            algorithm: "RS256",
            expiresIn: this.authConfigService.jwtAccessTokenExpiresIn / 1000,
          },
        };
  }
}
