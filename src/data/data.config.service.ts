import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as ms from "ms";

@Injectable()
export class DataConfigService {
  constructor(private readonly configService: ConfigService) {}

  get timeout(): number {
    return ms(this.configService.get<string>("data.timeout", "s"));
  }

  get uri(): string {
    return this.configService.get<string>("data.uri", "");
  }
}
