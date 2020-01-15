import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { AuthConfigService } from "./auth.config.service";
import { JwksService } from "src/jwks/jwks.service";

@Injectable()
export class AuthJwtOptionsFactory implements JwtOptionsFactory {
  constructor(
    private readonly authConfigService: AuthConfigService,
    private readonly jwksService: JwksService
  ) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return this.jwksService
      .findOne("4f2d3063-8fdb-4919-8f4d-deb7bef235e7")
      .then(jwks => {
        if (jwks !== undefined) {
          return {
            privateKey: jwks.privateKey,
            publicKey: jwks.publicKey,
            // secretOrKeyProvider?: (requestType: JwtSecretRequestType, tokenOrPayload: string | object | Buffer, options?: jwt.VerifyOptions | jwt.SignOptions) => jwt.Secret;
            signOptions: {
              algorithm: "RS256",
              // keyid?: string;
              // /** @member {string} - expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
              expiresIn: this.authConfigService.jwtSignOptionsExpiresIn
              // /** @member {string} - expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
              // notBefore?: string | number;
              // audience?: string | string[];
              // subject?: string;
              // issuer?: string;
              // jwtid?: string;
              // noTimestamp?: boolean;
              // header?: object;
              // encoding?: string;
            }
            // verifyOptions?: {
            //   algorithms?: string[];
            //   audience?: string | string[];
            //   clockTimestamp?: number;
            //   clockTolerance?: number;
            //   issuer?: string | string[];
            //   ignoreExpiration?: boolean;
            //   ignoreNotBefore?: boolean;
            //   jwtid?: string;
            //   subject?: string;
            // };
          };
        }
        return {};
      });
  }
}
