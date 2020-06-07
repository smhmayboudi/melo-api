import { DGRAPH_ADDRESS, DGRAPH_DEBUG, RELATION } from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { RelationConfigServiceInterface } from "./relation.config.service.interface";

@Injectable()
export class RelationConfigService implements RelationConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get dgraphAddress(): string {
    return this.configService.get<string>(`${RELATION}.${DGRAPH_ADDRESS}`, "");
  }

  get dgraphDebug(): boolean {
    return this.configService.get<boolean>(`${RELATION}.${DGRAPH_DEBUG}`, true);
  }
}
