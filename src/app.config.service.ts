import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  botToken(): string {
    return this.configService.get<string>("auth.botToken", "smhmayboudi");
  }
}
