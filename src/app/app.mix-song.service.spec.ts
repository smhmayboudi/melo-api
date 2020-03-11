import { Test, TestingModule } from "@nestjs/testing";
import { DataArtistType } from "../data/data.artist.type";
import { RelationEntityResDto } from "../relation/dto/res/relation.entity.res.dto";
import { RelationMultiHasResDto } from "../relation/dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "../relation/dto/res/relation.pagination.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";
import { RelationType } from "../relation/relation.type";
import { AppConfigService } from "./app.config.service";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHashIdServiceInterface } from "./app.hash-id.service.interface";
import { AppMixSongService } from "./app.mix-song.service";
import { DataSongResDto } from "src/data/dto/res/data.song.res.dto";

describe("AppMixSongService", () => {
  const songs: DataSongResDto[] = [
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
  let service: AppMixSongService;

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => ""
  };

  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<RelationPaginationResDto<RelationEntityResDto>> =>
      Promise.resolve({
        results: [
          {
            id: "",
            type: RelationEntityType.album
          }
        ],
        total: 1
      } as RelationPaginationResDto<RelationEntityResDto>),
    has: (): Promise<void> => Promise.resolve(undefined),
    multiHas: (): Promise<RelationMultiHasResDto[]> =>
      Promise.resolve([
        {
          from: {
            id: "0",
            type: RelationEntityType.album
          },
          relation: RelationType.dislikedSongs,
          to: {
            id: "1",
            type: RelationEntityType.album
          }
        }
      ]),
    remove: (): Promise<void> => Promise.resolve(undefined),
    set: (): Promise<void> => Promise.resolve(undefined)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppConfigService, useValue: {} },
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

  it("mixSong should be equal to a song sub: 1", async () => {
    expect(await service.mixSong(1, songs)).toEqual(
      songs.map(value => ({ ...value, liked: false }))
    );
  });

  it("mixSong should be equal to a song sub: 0", async () => {
    expect(await service.mixSong(0, songs)).toEqual(songs);
  });
});
