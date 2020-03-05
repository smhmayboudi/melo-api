import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ms from "ms";
import { DataConfigServiceInterface } from "./data.config.service.interface";

@Injectable()
export class DataConfigService implements DataConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get timeout(): number {
    return ms(this.configService.get<string>("data.timeout", "0"));
  }

  get url(): string {
    return this.configService.get<string>("data.url", "");
  }
}
