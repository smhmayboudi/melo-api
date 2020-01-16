import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TokenConfigService {
  constructor(private readonly configService: ConfigService) {}

  get test(): string {
    return this.configService.get<string>("token.test", "test");
  }
}
