import { AuthStrategyResDto } from "./dto/res/auth.strategy.res.to";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-anonym-uuid";

@Injectable()
export class AnonymUUIDStrategy extends PassportStrategy(Strategy) {
  async validate(): Promise<AuthStrategyResDto> {
    return Promise.resolve({
      sub: "0"
    });
  }
}
