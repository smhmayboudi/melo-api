import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DataConfigService {
  constructor(private readonly configService: ConfigService) {}

  get timeout(): number {
    return this.configService.get<number>("data.timeout", 5000);
  }

  get uri(): string {
    return this.configService.get<string>(
      "data.uri",
      "http://94.130.186.111:8085/v1"
    );
  }
}
