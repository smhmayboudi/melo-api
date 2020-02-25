import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppMixArtistService } from "./app.mix-artist.service";
import { AppHashIdService } from "./app.hash-id.service";
import { RelationService } from "../relation/relation.service";
describe("AppMixArtistService", () => {
  let service: AppMixArtistService;

  const appHashIdServiceMock = jest.fn(() => ({
    decode: 0,
    encode: ""
  }));

  const relationServiceMock = jest.fn(() => ({
    multiHas: {
      from: {
        id: 0,
        name: "",
        type: ""
      },
      to: {
        id: 0,
        name: "",
        type: ""
      },
      rellation: ""
    }
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ConfigModule.forFeature(config)],
      providers: [
        AppConfigService,
        AppMixArtistService,
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: RelationService, useValue: relationServiceMock }
      ]
    }).compile();

    service = module.get<AppMixArtistService>(AppMixArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
