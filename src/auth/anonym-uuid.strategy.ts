import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-anonym-uuid";
import { AuthStrategyResDto } from "./dto/res/auth.strategy.res.to";

@Injectable()
export class AnonymUUIDStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(): Promise<AuthStrategyResDto> {
    return Promise.resolve({
      sub: "0"
    });
  }
}
