import { forwardRef } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { JwksModule } from "../jwks/jwks.module";
import { RtModule } from "../rt/rt.module";
import { RtService } from "../rt/rt.service";
import { TokenStrategy } from "./token.strategy";

describe("TokenStrategy", () => {
  let rtService: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), JwksModule, RtModule]
    }).compile();

    rtService = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(new TokenStrategy(rtService)).toBeDefined();
  });
});
