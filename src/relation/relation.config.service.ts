import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ms from "ms";

@Injectable()
export class RelationConfigService {
  constructor(private readonly configService: ConfigService) {}

  get timeout(): number {
    return ms(this.configService.get<string>("relation.timeout", "0"));
  }

  get uri(): string {
    return this.configService.get<string>("relation.url", "");
  }
}
