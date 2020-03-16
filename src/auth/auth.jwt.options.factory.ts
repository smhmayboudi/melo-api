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

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return this.jwksService.getOneRandom().then(jwks =>
      jwks === undefined
        ? {}
        : {
            jsonWebTokenOptions: {
              algorithms: ["RS256"]
            },
            privateKey: jwks.private_key,
            publicKey: jwks.public_key,
            signOptions: {
              algorithm: "RS256",
              expiresIn: this.authConfigService.jwtAccessTokenExpiresIn / 1000
            }
          }
    );
  }
}
