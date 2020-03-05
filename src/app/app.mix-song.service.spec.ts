import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppMixSongService } from "./app.mix-song.service";
import { DataArtistType } from "../data/data.artist.type";
import { AppHashIdService } from "./app.hash-id.service";
import { RelationService } from "../relation/relation.service";

describe("AppMixSongService", () => {
  let service: AppMixSongService;

  const appHashIdServiceMock = {
    decode: (): number => 0,
    encode: (): string => ""
  };

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
        AppMixSongService,
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: RelationService, useValue: relationServiceMock }
      ]
    }).compile();
    service = module.get<AppMixSongService>(AppMixSongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("mixSong should be defined", async () => {
    const reqRes = [
      {
        artists: [
          {
            followersCount: 0,
            id: "",
            type: DataArtistType.prime
          }
        ],
        audio: {
          high: {
            fingerprint: "",
            url: ""
          }
        },
        duration: 0,
        id: "",
        localized: false,
        releaseDate: new Date(),
        title: ""
      }
    ];
    jest
      .spyOn(service, "mixSong")
      .mockImplementation(() => Promise.resolve(reqRes));

    expect(await service.mixSong(0, reqRes)).toBe(reqRes);
  });
});
