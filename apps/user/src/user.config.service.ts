import {
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_LOGGING,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME,
  USER,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { UserConfigServiceInterface } from "./user.config.service.interface";

@Injectable()
export class UserConfigService implements UserConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get typeormDatabase(): string {
    return this.configService.get<string>(`${USER}.${TYPEORM_DATABASE}`, "");
  }

  get typeormHost(): string {
    return this.configService.get<string>(`${USER}.${TYPEORM_HOST}`, "");
  }

  get typeormLogging(): boolean {
    return this.configService.get<boolean>(`${USER}.${TYPEORM_LOGGING}`, true);
  }

  get typeormPassword(): string {
    return this.configService.get<string>(`${USER}.${TYPEORM_PASSWORD}`, "");
  }

  get typeormPort(): number {
    return this.configService.get<number>(`${USER}.${TYPEORM_PORT}`, 0);
  }

  get typeormSynchronize(): boolean {
    return this.configService.get<boolean>(
      `${USER}.${TYPEORM_SYNCHRONIZE}`,
      true
    );
  }

  get typeormUsername(): string {
    return this.configService.get<string>(`${USER}.${TYPEORM_USERNAME}`, "");
  }
}
