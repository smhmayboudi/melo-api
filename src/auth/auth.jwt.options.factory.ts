import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { JwksService } from "../jwks/jwks.service";
import { AuthConfigService } from "./auth.config.service";

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
            privateKey: jwks.private_key,
            publicKey: jwks.public_key,
            signOptions: {
              algorithm: "RS256",
              expiresIn: this.authConfigService.jwtAccessTokenExpiresIn / 1000
            },
            jsonWebTokenOptions: {
              algorithms: ["RS256"]
            }
          }
    );
  }
}
