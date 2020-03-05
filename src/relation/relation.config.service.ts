import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ms from "ms";
import { RelationConfigServiceInterface } from "./relation.config.service.interface";

@Injectable()
export class RelationConfigService implements RelationConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get timeout(): number {
    return ms(this.configService.get<string>("relation.timeout", "0"));
  }

  get url(): string {
    return this.configService.get<string>("relation.url", "");
  }
}
