import {
  ArtistConfigReqDto,
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  RelationEdgeType,
  RelationEntityReqDto,
  RelationEntityType,
  RelationResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppArtistService } from "../app/app.artist.service";
import { AppArtistServiceInterface } from "../app/app.artist.service.interface";
import { ArtistService } from "./artist.service";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistServiceInterface } from "../data/data.artist.service.interface";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";

describe("ArtistService", () => {
  const config: ArtistConfigReqDto = {
    maxSize: 0,
  };
  const dataConfigElasticsearch: DataConfigElasticsearchReqDto = {
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
  };
  const dataConfigImage: DataConfigImageReqDto = {
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imageSalt: "",
    imageSignatureSize: 1,
    imageTypeSize: [
      {
        height: 0,
        name: "",
        width: 0,
      },
    ],
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const from: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };
  const relationMultiHas: RelationResDto = {
    from,
    to: {
      id: 0,
      type: RelationEntityType.user,
    },
    type: RelationEdgeType.follows,
  };

  const appArtistServiceMock: AppArtistServiceInterface = {
    follow: (): Promise<ArtistResDto> => Promise.resolve(artist),
    follows: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
  };
  const dataArtistServiceMock: DataArtistServiceInterface = {
    get: (): Promise<ArtistResDto> => Promise.resolve(artist),
    getByIds: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
    trending: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
    trendingGenre: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
  };
  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<RelationResDto[]> => Promise.resolve([relationMultiHas]),
    has: (): Promise<RelationResDto | undefined> =>
      Promise.resolve(relationMultiHas),
    multiHas: (): Promise<RelationResDto[]> =>
      Promise.resolve([relationMultiHas]),
    remove: (): Promise<RelationResDto> => Promise.resolve(relationMultiHas),
    set: (): Promise<RelationResDto> => Promise.resolve(relationMultiHas),
  };

  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: AppArtistService, useValue: appArtistServiceMock },
        { provide: DataArtistService, useValue: dataArtistServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("follow should be equal to an artist", async () => {
    const dto: ArtistFollowReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await service.follow(dto)).toEqual({
      ...artist,
      followersCount: 1,
      following: true,
    });
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.following(dto)).toEqual([artist]);
  });

  it("following should equal an empty list", async () => {
    const relationServiceMockGet: RelationServiceInterface = {
      ...relationServiceMock,
      get: (): Promise<RelationResDto[]> => Promise.resolve([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: AppArtistService, useValue: appArtistServiceMock },
        { provide: DataArtistService, useValue: dataArtistServiceMock },
        { provide: RelationService, useValue: relationServiceMockGet },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);

    const dto: ArtistFollowingReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.following(dto)).toEqual([]);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.profile(dto)).toEqual(artist);
  });

  it("trending should equal list of artists", async () => {
    const dto: ArtistTrendingReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
    };
    expect(await service.trending(dto)).toEqual([artist]);
  });

  it("trendingGenre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      genre: "",
    };
    expect(await service.trendingGenre(dto)).toEqual([artist]);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await service.unfollow(dto)).toEqual({
      ...artist,
      followersCount: -1,
      following: false,
    });
  });
});
