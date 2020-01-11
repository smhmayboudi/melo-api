import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserConfigService {
  constructor(private readonly configService: ConfigService) {}

  test(): string {
    return this.configService.get<string>("user.test", "test");
  }
}
