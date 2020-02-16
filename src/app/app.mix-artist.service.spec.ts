import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppMixArtistService } from "./app.mix-artist.service";
describe("AppMixArtistService", () => {
  let service: AppMixArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ConfigModule.forFeature(config)],
      providers: [AppConfigService, AppMixArtistService]
    }).compile();

    service = module.get<AppMixArtistService>(AppMixArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("mixArtist");
});
