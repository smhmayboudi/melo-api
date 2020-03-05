import { Test, TestingModule } from "@nestjs/testing";
import { SongConfigService } from "./song.config.service";
import { SongHttpOptionsFactory } from "./song.http.options.factory";

describe("SongHttpOptionsFactory", () => {
  let service: SongConfigService;

  beforeEach(async () => {
    const songConfigServiceMock = {
      timeout: 0
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SongConfigService,
          useValue: songConfigServiceMock
        }
      ]
    }).compile();
    service = module.get<SongConfigService>(SongConfigService);
  });

  it("should be defined", () => {
    expect(new SongHttpOptionsFactory(service)).toBeDefined();
  });

  it("createHttpOptions should be defined", () => {
    expect(
      new SongHttpOptionsFactory(service).createHttpOptions()
    ).toBeDefined();
  });
});
