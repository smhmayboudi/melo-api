import {
  RT,
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

import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { RtConfigServiceInterface } from "./rt.config.service.interface";
import ms from "ms";

@Injectable()
export class RtConfigService implements RtConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get servicePort(): number {
    return this.configService.get<number>(`${RT}.${SERVICE_PORT}`, 0);
  }

  get serviceRetryAttempts(): number {
    return this.configService.get<number>(`${RT}.${SERVICE_RETRY_ATTEMPTS}`, 0);
  }

  get serviceRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${RT}.${SERVICE_RETRY_DELAY}`, "0")
    );
  }

  get serviceUrl(): string {
    return this.configService.get<string>(`${RT}.${SERVICE_URL}`, "");
  }

  get typeormDatabase(): string {
    return this.configService.get<string>(`${RT}.${TYPEORM_DATABASE}`, "");
  }

  get typeormHost(): string {
    return this.configService.get<string>(`${RT}.${TYPEORM_HOST}`, "");
  }

  get typeormLogging(): boolean {
    return this.configService.get<boolean>(`${RT}.${TYPEORM_LOGGING}`, true);
  }

  get typeormPassword(): string {
    return this.configService.get<string>(`${RT}.${TYPEORM_PASSWORD}`, "");
  }

  get typeormPort(): number {
    return this.configService.get<number>(`${RT}.${TYPEORM_PORT}`, 0);
  }

  get typeormSynchronize(): boolean {
    return this.configService.get<boolean>(
      `${RT}.${TYPEORM_SYNCHRONIZE}`,
      true
    );
  }

  get typeormUsername(): string {
    return this.configService.get<string>(`${RT}.${TYPEORM_USERNAME}`, "");
  }
}
