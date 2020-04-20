import { IsString } from "class-validator";

export class AuthStrategyResDto {
  constructor(sub: string) {
    this.sub = sub;
  }

  @IsString()
  sub: string;
}
