import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppMixSongService } from "./app.mix-song.service";
describe("AppMixSongService", () => {
  let service: AppMixSongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ConfigModule.forFeature(config)],
      providers: [AppConfigService, AppMixSongService]
    }).compile();

    service = module.get<AppMixSongService>(AppMixSongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("mixSong");
});
