import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { AuthConfigService } from "./auth.config.service";

@Injectable()
export class AuthJwtOptionsFactory implements JwtOptionsFactory {
  constructor(private readonly authConfigService: AuthConfigService) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: this.authConfigService.jwtSecret,
      signOptions: {
        expiresIn: this.authConfigService.jwtSignOptionsExpiresIn
      }
    };
  }
}
