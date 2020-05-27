import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  AuthStrategyResDto,
} from "@melo/common";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "./anonym.strategy";

@Injectable()
export class AnonymUUIDStrategy extends PassportStrategy(Strategy) {
  async validate(
    authorization: string | undefined
  ): Promise<AuthStrategyResDto> {
    if (authorization === undefined) {
      return Promise.resolve({
        sub: APP_REQUEST_USER_SUB_ANONYMOUS_ID,
      });
    }
    throw new UnauthorizedException();
  }
}
