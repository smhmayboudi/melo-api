import { ConfigService } from "@nestjs/config";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class DataConfigService implements DataConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get timeout(): number {
    return ms(this.configService.get<string>("data.timeout", "0s"));
  }

  get url(): string {
    return this.configService.get<string>("data.url", "");
  }
}
