import { Test, TestingModule } from "@nestjs/testing";

import { SongConfigService } from "./song.config.service";
import { SongConfigServiceInterface } from "./song.config.service.interface";
import { SongHttpOptionsFactory } from "./song.http.options.factory";

describe("SongHttpOptionsFactory", () => {
  const songConfigServiceMock: SongConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    maxSize: 0,
    sendTimeout: 0,
    sendUrl: "",
  };

  let service: SongConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SongConfigService,
          useValue: songConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<SongConfigService>(SongConfigService);
  });

  it("should be defined", () => {
    expect(new SongHttpOptionsFactory(service)).toBeDefined();
  });

  it("createHttpOptions should be equal to an option", () => {
    expect(new SongHttpOptionsFactory(service).createHttpOptions()).toEqual({
      timeout: 0,
    });
  });
});
