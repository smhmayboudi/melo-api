import {
  DGRAPH_ADDRESS,
  DGRAPH_DEBUG,
  RELATION,
  SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY,
  SERVICE_URL,
} from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { RelationConfigServiceInterface } from "./relation.config.service.interface";
import ms from "ms";

@Injectable()
export class RelationConfigService implements RelationConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get dgraphAddress(): string {
    return this.configService.get<string>(`${RELATION}.${DGRAPH_ADDRESS}`, "");
  }

  get dgraphDebug(): boolean {
    return this.configService.get<boolean>(`${RELATION}.${DGRAPH_DEBUG}`, true);
  }

  get servicePort(): number {
    return this.configService.get<number>(`${RELATION}.${SERVICE_PORT}`, 0);
  }

  get serviceRetryAttempts(): number {
    return this.configService.get<number>(
      `${RELATION}.${SERVICE_RETRY_ATTEMPTS}`,
      0
    );
  }

  get serviceRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${RELATION}.${SERVICE_RETRY_DELAY}`, "0")
    );
  }

  get serviceUrl(): string {
    return this.configService.get<string>(`${RELATION}.${SERVICE_URL}`, "");
  }
}
