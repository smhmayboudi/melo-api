import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RelationConfigService {
  constructor(private readonly configService: ConfigService) {}

  get uri(): string {
    return this.configService.get<string>(
      "user.uri",
      "http://94.130.186.111:8086/v1"
    );
  }
}
