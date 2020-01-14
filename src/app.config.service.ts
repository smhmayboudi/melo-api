import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>("auth.port", 3000);
  }

  get rateLimitMax(): number {
    return this.configService.get<number>("auth.rateLimitMax", 100);
  }

  get rateLimitwindowMs(): number {
    return this.configService.get<number>("auth.rateLimitWindowMs", 900000);
  }
}
