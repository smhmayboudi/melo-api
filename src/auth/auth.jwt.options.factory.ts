import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { AuthConfigService } from "./auth.config.service";

@Injectable()
export class AuthJwtOptionsFactory implements JwtOptionsFactory {
  constructor(private readonly authConfigService: AuthConfigService) {}
  // private readonly keyService: KeyService

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    // const key = this.keyService.findOneTest(1);
    return {
      privateKey: `
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCyXWOVb+Spd8bRQW9xU2/dGYiLuWgGBB6kz8djELxIZM46bDPZ
FkCJtVLLMcXFpfZS7hbdoPqYDvG3Z59leAwK5MqipcvL/EFpp8cUYiN0m7eUb4D6
l5gOcJn5fIOVKr6aKaP6zMVlqHTDqV8oQsLr2izlhWM/dSPAs1wwn6LZTQIDAQAB
AoGBAJBW6N6mtQm7RyZR6MhxuAXZwtknihnMPawsBPOTOHrxML6wj2ivDD0kgkKz
HZPr0SGdUN27hu+EsHE2JxSrCDpx+xoZf07GTjJuZCD3jOps8EDiubMB/ZiV50AG
1JYf8dEsydvzvKoWKa3Wc9YVy+9fjEWUtIlGfSvXC9LYh81BAkEA5G7eQnjqogd2
c8O5s7eOaNNm/CxUOSTz5dV7FokCvfM54nEl6TQ4vqKa14d0BwLFI1vgXbfYlNlp
kiLTyYLNfQJBAMfjupiPDCt44EYO/YqDlKIBb1Hi6ZxOAp3144dJdvYr0alU0dwJ
8C5Nf70mm8HoRvr0xeqhrPCfcFSb73M2RBECQAFsD0YqqotHsJ0X4tgTlHdimYmI
XR3d9QbBRXrmb3XvRbT7L1k8Uf4d1Qjydu50PfXyZHsw4dBLajTWsqrWfaECQG7R
DMi5PWj4aXXNp7hb/FHYc8u0/gheo0rJYCvHicEuR90VngbcJ6Cz7GaD+gQFbxyA
CR1sJoF8Ev2FObno0tECQAgEtMI7SeBJxkGcWJx4WmwLbrLdl7sa5KTLvohyG27i
GRvAghgseISkBNuqfdI0+q+N+o86pdYZQ4RpbDs3Exo=
-----END RSA PRIVATE KEY-----
`,
      publicKey: `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyXWOVb+Spd8bRQW9xU2/dGYiL
uWgGBB6kz8djELxIZM46bDPZFkCJtVLLMcXFpfZS7hbdoPqYDvG3Z59leAwK5Mqi
pcvL/EFpp8cUYiN0m7eUb4D6l5gOcJn5fIOVKr6aKaP6zMVlqHTDqV8oQsLr2izl
hWM/dSPAs1wwn6LZTQIDAQAB
-----END PUBLIC KEY-----
`,
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
}
