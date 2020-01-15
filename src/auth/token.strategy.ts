import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UniqueTokenStrategy as Strategy } from "passport-unique-token";
import { AuthConfigService } from "./auth.config.service";
import { Payload } from "./type/Payload";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly authConfigService: AuthConfigService) {
    super({
      tokenField: "token",
      tokenQuery: "token",
      tokenParams: "token",
      tokenHeader: "token",
      passReqToCallback: false,
      caseSensitive: true,
      failOnMissing: true
    });
  }

  async validate(_token: string): Promise<Payload> {
    return Promise.resolve({ uid: 1 });
  }
}
