import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UniqueTokenStrategy as Strategy } from "passport-unique-token";
import { TokenService } from "../token/token.service";
import { AuthConfigService } from "./auth.config.service";
import { JwtPayload } from "./type/JwtPayload";

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

  async validate(token: string): Promise<JwtPayload> {
    const tokenEntity = await this.tokenService.validateByToken(token);
    if (tokenEntity !== undefined && new Date() < tokenEntity.expire_at) {
      return {
        exp: 0,
        iat: 0,
        jti: "0",
        sub: tokenEntity.user_id.toString()
      };
    }
    throw new UnauthorizedException();
  }
}
