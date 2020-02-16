import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./song.config";
import { SongConfigService } from "./song.config.service";
import { SongHttpModuleOptionsFactory } from "./song.http.options.factory";

describe("SongHttpModuleOptionsFactory", () => {
  let service: SongConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [SongConfigService]
    }).compile();

    service = module.get<SongConfigService>(SongConfigService);
  });

  it("should be defined", () => {
    expect(new SongHttpModuleOptionsFactory(service)).toBeDefined();
  });
});
