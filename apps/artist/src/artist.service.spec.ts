import {
  ArtistConfigReqDto,
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  DATA_ARTIST_SERVICE_GET,
  DATA_SERVICE,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  RELATION_SERVICE,
  RELATION_SERVICE_GET,
  RELATION_SERVICE_REMOVE,
  RelationEdgeType,
  RelationEntityReqDto,
  RelationEntityType,
  RelationResDto,
} from "@melo/common";
import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { ArtistService } from "./artist.service";

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
  const artistFollow: ArtistFollowReqDto = {
    dataConfigElasticsearch,
    dataConfigImage,
    id: 0,
    sub: 1,
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
  // TOOD: interface ?
  const dataClientProxyMock = {
    send: (token: string) =>
      token === DATA_ARTIST_SERVICE_GET ? of(artist) : of([artist]),
  };
  // TOOD: interface ?
  const relationClientProxyMock = {
    send: (token: string) =>
      token === RELATION_SERVICE_GET
        ? of([relationMultiHas])
        : token === RELATION_SERVICE_REMOVE
        ? of(true)
        : of(artistFollow),
  };

  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: DATA_SERVICE, useValue: dataClientProxyMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
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

  it("profile should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.profile(dto)).toEqual(artist);
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
    expect(await service.unfollow(dto)).toEqual(artist);
  });

  it("following should equal list of artists 2", async () => {
    // TOOD: interface ?
    const relationClientProxyMock = {
      send: (): Observable<RelationResDto[]> => of([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: DATA_SERVICE, useValue: dataClientProxyMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
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
});
