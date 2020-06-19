import {
  AT,
  SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY,
  SERVICE_URL,
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_LOGGING,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME,
} from "@melo/common";

import { AtConfigServiceInterface } from "./at.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class AtConfigService implements AtConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get servicePort(): number {
    return this.configService.get<number>(`${AT}.${SERVICE_PORT}`, 0);
  }

  get serviceRetryAttempts(): number {
    return this.configService.get<number>(`${AT}.${SERVICE_RETRY_ATTEMPTS}`, 0);
  }

  get serviceRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${AT}.${SERVICE_RETRY_DELAY}`, "0")
    );
  }

  get serviceUrl(): string {
    return this.configService.get<string>(`${AT}.${SERVICE_URL}`, "");
  }

  get typeormDatabase(): string {
    return this.configService.get<string>(`${AT}.${TYPEORM_DATABASE}`, "");
  }

  get typeormHost(): string {
    return this.configService.get<string>(`${AT}.${TYPEORM_HOST}`, "");
  }

  get typeormLogging(): boolean {
    return this.configService.get<boolean>(`${AT}.${TYPEORM_LOGGING}`, true);
  }

  get typeormPassword(): string {
    return this.configService.get<string>(`${AT}.${TYPEORM_PASSWORD}`, "");
  }

  get typeormPort(): number {
    return this.configService.get<number>(`${AT}.${TYPEORM_PORT}`, 0);
  }

  get typeormSynchronize(): boolean {
    return this.configService.get<boolean>(
      `${AT}.${TYPEORM_SYNCHRONIZE}`,
      true
    );
  }

  get typeormUsername(): string {
    return this.configService.get<string>(`${AT}.${TYPEORM_USERNAME}`, "");
  }
}
