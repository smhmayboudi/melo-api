import { Test, TestingModule } from "@nestjs/testing";
import { SongConfigService } from "./song.config.service";
import { SongHttpModuleOptionsFactory } from "./song.http.options.factory";

describe("SongHttpModuleOptionsFactory", () => {
  let service: SongConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongConfigService]
    }).compile();
    service = module.get<SongConfigService>(SongConfigService);
  });

  it("should be defined", () => {
    expect(new SongHttpModuleOptionsFactory(service)).toBeDefined();
  });
});
