import {
  CONST,
  CommonImageTypeSize,
  IMAGE_BASE_URL,
  IMAGE_ENCODE,
  IMAGE_KEY,
  IMAGE_SALT,
  IMAGE_SIGNATURE_SIZE,
  IMAGE_TYPE_SIZE,
  SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY,
  SERVICE_URL,
  STATIC_IMAGE_PATHS,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { ConstConfigServiceInterface } from "./const.config.service.interface";
import { Injectable } from "@nestjs/common";
import { SignatureSize } from "imgproxy/dist/types";
import ms from "ms";

@Injectable()
export class ConstConfigService implements ConstConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get imageBaseUrl(): string {
    return this.configService.get<string>(`${CONST}.${IMAGE_BASE_URL}`, "");
  }

  get imageEncode(): boolean {
    return this.configService.get<boolean>(`${CONST}.${IMAGE_ENCODE}`, true);
  }

  get imageTypeSize(): CommonImageTypeSize[] {
    return JSON.parse(
      this.configService.get<string>(
        `${CONST}.${IMAGE_TYPE_SIZE}`,
        '[{"height":0,"name":"","width":0}]'
      )
    ) as CommonImageTypeSize[];
  }

  get imageKey(): string {
    return this.configService.get<string>(`${CONST}.${IMAGE_KEY}`, "");
  }

  get imageSalt(): string {
    return this.configService.get<string>(`${CONST}.${IMAGE_SALT}`, "");
  }

  get imageSignatureSize(): SignatureSize {
    return this.configService.get<SignatureSize>(
      `${CONST}.${IMAGE_SIGNATURE_SIZE}`,
      1
    );
  }

  get servicePort(): number {
    return this.configService.get<number>(`${CONST}.${SERVICE_PORT}`, 0);
  }

  get serviceRetryAttempts(): number {
    return this.configService.get<number>(
      `${CONST}.${SERVICE_RETRY_ATTEMPTS}`,
      0
    );
  }

  get serviceRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${CONST}.${SERVICE_RETRY_DELAY}`, "0")
    );
  }

  get serviceUrl(): string {
    return this.configService.get<string>(`${CONST}.${SERVICE_URL}`, "");
  }

  get staticImagePaths(): { [key: string]: string } {
    return JSON.parse(
      this.configService.get<string>(
        `${CONST}.${STATIC_IMAGE_PATHS}`,
        '{"":""}'
      )
    );
  }
}
