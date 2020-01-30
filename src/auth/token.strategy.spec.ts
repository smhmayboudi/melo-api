import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { JwksEntityRepository } from "../jwks/jwks.entity.repository";
import { JwksService } from "../jwks/jwks.service";
import { RtService } from "../rt/rt.service";
import { AuthConfigService } from "./auth.config.service";
import { TokenStrategy } from "./token.strategy";

describe("TokenStrategy", () => {
  let rtService: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthConfigService,
        ConfigService,
        JwksEntityRepository,
        JwksService
      ]
    }).compile();

    rtService = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(new TokenStrategy(rtService)).toBeDefined();
  });
});
