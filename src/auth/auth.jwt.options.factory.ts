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
    return this.jwksService.getOneRandom().then(jwks => {
      if (jwks === undefined) {
        return {};
      }
      return {
        privateKey: jwks.private_key,
        publicKey: jwks.public_key,
        // secretOrKeyProvider?: (requestType: JwtSecretRequestType, rtOrPayload: string | object | Buffer, options?: jwt.VerifyOptions | jwt.SignOptions) => jwt.Secret;
        // signOptions?: jwt.SignOptions;
        signOptions: {
          algorithm: "RS256",
          // keyid?: string;
          // /** @member {string} - expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
          expiresIn: this.authConfigService.jwtRefreshTokenExpiresIn
          // /** @member {string} - expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
          // notBefore?: string | number;
          // audience?: string | string[];
          // subject?: string;
          // issuer?: string;
          // jwtid?: string;
          // noTimestamp?: boolean;
          // header?: object;
          // encoding?: string;
        },
        // verifyOptions?: jwt.VerifyOptions;
        jsonWebTokenOptions: {
          algorithms: ["RS256"]
          // audience?: string | string[];
          // clockTimestamp?: number;
          // clockTolerance?: number;
          // ignoreExpiration?: boolean;
          // ignoreNotBefore?: boolean;
          // issuer?: string | string[];
          // jwtid?: string;
          // subject?: string;
        }
      };
    });
  }
}
