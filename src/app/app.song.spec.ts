import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "./app.config.service";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHashIdServiceInterface } from "./app.hash-id.service.interface";
import { AppSong } from "./app.song";
import { DataArtistType } from "../data/data.artist.type";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { RelationEntityResDto } from "../relation/dto/res/relation.entity.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationMultiHasResDto } from "../relation/dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "../relation/dto/res/relation.pagination.res.dto";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";
import { RelationType } from "../relation/relation.type";

describe("AppSong", () => {
  const songs: DataSongResDto[] = [
    {
      artists: [
        {
          followersCount: 0,
          id: 0,
          type: DataArtistType.prime,
        },
      ],
      audio: {
        high: {
          fingerprint: "",
          url: "",
        },
      },
      duration: 0,
      id: 0,
      localized: false,
      releaseDate: new Date(),
      title: "",
    },
  ];
  let service: AppSong;

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
  };

  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<RelationPaginationResDto<RelationEntityResDto>> =>
      Promise.resolve({
        results: [
          {
            id: 0,
            type: RelationEntityType.album,
          },
        ],
        total: 1,
      } as RelationPaginationResDto<RelationEntityResDto>),
    has: (): Promise<void> => Promise.resolve(undefined),
    multiHas: (): Promise<RelationMultiHasResDto[]> =>
      Promise.resolve([
        {
          from: {
            id: 0,
            type: RelationEntityType.album,
          },
          relation: RelationType.dislikedSongs,
          to: {
            id: 1,
            type: RelationEntityType.album,
          },
        },
      ]),
    remove: (): Promise<void> => Promise.resolve(undefined),
    set: (): Promise<void> => Promise.resolve(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppConfigService, useValue: {} },
        AppSong,
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
      ],
    }).compile();
    service = module.get<AppSong>(AppSong);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("like should be equal to a song sub: 1", async () => {
    expect(await service.like(songs, 1)).toEqual(
      songs.map((value) => ({ ...value, liked: false }))
    );
  });
});
