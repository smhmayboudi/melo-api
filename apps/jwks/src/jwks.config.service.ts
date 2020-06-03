import {
  JWKS,
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_LOGGING,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { JwksConfigServiceInterface } from "./jwks.config.service.interface";

@Injectable()
export class JwksConfigService implements JwksConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get typeormDatabase(): string {
    return this.configService.get<string>(`${JWKS}.${TYPEORM_DATABASE}`, "");
  }

  get typeormHost(): string {
    return this.configService.get<string>(`${JWKS}.${TYPEORM_HOST}`, "");
  }

  get typeormLogging(): boolean {
    return this.configService.get<boolean>(`${JWKS}.${TYPEORM_LOGGING}`, true);
  }

  get typeormPassword(): string {
    return this.configService.get<string>(`${JWKS}.${TYPEORM_PASSWORD}`, "");
  }

  get typeormPort(): number {
    return this.configService.get<number>(`${JWKS}.${TYPEORM_PORT}`, 0);
  }

  get typeormSynchronize(): boolean {
    return this.configService.get<boolean>(
      `${JWKS}.${TYPEORM_SYNCHRONIZE}`,
      true
    );
  }

  get typeormUsername(): string {
    return this.configService.get<string>(`${JWKS}.${TYPEORM_USERNAME}`, "");
  }
}
