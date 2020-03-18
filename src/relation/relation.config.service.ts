import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { RelationConfigServiceInterface } from "./relation.config.service.interface";
import ms from "ms";

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
