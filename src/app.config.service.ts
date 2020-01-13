import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get botToken(): string {
    return this.configService.get<string>("auth.botToken", "smhmayboudi");
  }

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
