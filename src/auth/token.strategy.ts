import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UniqueTokenStrategy as Strategy } from "passport-unique-token";
import { TokenService } from "src/token/token.service";
import { AuthConfigService } from "./auth.config.service";
import { Payload } from "./type/Payload";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly authConfigService: AuthConfigService,
    private readonly tokenService: TokenService
  ) {
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

  async validate(token: string): Promise<Payload> {
    const token2 = await this.tokenService.findOneByToken(token);
    if (token2 !== undefined && new Date() < token2.expiration_date) {
      return { uid: token2.user_id };
    }
    throw new UnauthorizedException();
  }
}
