import {
  FILE,
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_LOGGING,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { FileConfigServiceInterface } from "./file.config.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileConfigService implements FileConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get typeormDatabase(): string {
    return this.configService.get<string>(`${FILE}.${TYPEORM_DATABASE}`, "");
  }

  get typeormHost(): string {
    return this.configService.get<string>(`${FILE}.${TYPEORM_HOST}`, "");
  }

  get typeormLogging(): boolean {
    return this.configService.get<boolean>(`${FILE}.${TYPEORM_LOGGING}`, true);
  }

  get typeormPassword(): string {
    return this.configService.get<string>(`${FILE}.${TYPEORM_PASSWORD}`, "");
  }

  get typeormPort(): number {
    return this.configService.get<number>(`${FILE}.${TYPEORM_PORT}`, 0);
  }

  get typeormSynchronize(): boolean {
    return this.configService.get<boolean>(
      `${FILE}.${TYPEORM_SYNCHRONIZE}`,
      true
    );
  }

  get typeormUsername(): string {
    return this.configService.get<string>(`${FILE}.${TYPEORM_USERNAME}`, "");
  }
}
