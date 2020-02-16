import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { AtModule } from "../at/at.module";
import { AtService } from "../at/at.service";
import { JwksModule } from "../jwks/jwks.module";
import { JwksService } from "../jwks/jwks.service";
import { RtModule } from "../rt/rt.module";
import { RtService } from "../rt/rt.service";
import config from "./auth.config";
import { AuthConfigService } from "./auth.config.service";
import { JwtStrategy } from "./jwt.strategy";

describe("JwtStrategy", () => {
  let atService: AtService;
  let authConfigService: AuthConfigService;
  let jwksService: JwksService;
  let rtService: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        AtModule,
        JwksModule,
        RtModule
      ],
      providers: [AuthConfigService]
    }).compile();

    atService = module.get<AtService>(AtService);
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
    rtService = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(
      new JwtStrategy(atService, authConfigService, jwksService, rtService)
    ).toBeDefined();
  });
});
