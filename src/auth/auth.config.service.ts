import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthConfigService {
  constructor(private readonly configService: ConfigService) {}

  jwtSecret(): string {
    return this.configService.get<string>("auth.jwtSecret", "smhmayboudi");
  }

  jwtSignOptionsExpiresIn(): string {
    return this.configService.get<string>(
      "auth.jwtSignOptionsExpiresIn",
      "60s"
    );
  }
}
