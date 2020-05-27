import {
  ArtistConfigReqDto,
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  DATA_SERVICE,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  RELATION_SERVICE,
  RelationEntityReqDto,
  RelationEntityType,
} from "@melo/common";
import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { ArtistService } from "./artist.service";

describe("ArtistService", () => {
  const config: ArtistConfigReqDto = {
    maxSize: 0,
  };
  const dataConfigElasticSearch: DataConfigElasticSearchReqDto = {
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
    dataConfigElasticSearch,
    dataConfigImage,
    id: 0,
    sub: 1,
  };
  const artistPagination: DataPaginationResDto<ArtistResDto> = {
    results: [artist],
    total: 1,
  } as DataPaginationResDto<ArtistResDto>;
  const relation: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.album,
  };
  const relationPagination: DataPaginationResDto<RelationEntityReqDto> = {
    results: [relation],
    total: 1,
  } as DataPaginationResDto<RelationEntityReqDto>;

  // TOOD: interface ?
  const clientProxyDataMock = {
    send: (): Observable<ArtistResDto> => of(artist),
  };
  // TOOD: interface ?
  const clientProxyRelationMock = {
    send: (): Observable<ArtistFollowReqDto> => of(artistFollow),
  };

  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("follows should be equal to an artist", async () => {
    const dto: ArtistFollowReqDto = {
      dataConfigElasticSearch,
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
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.profile(dto)).toEqual(artist);
  });

  it("following should equal list of artists 2", async () => {
    // TOOD: interface ?
    const clientProxyDataMock = {
      send: (): Observable<DataPaginationResDto<ArtistResDto>> =>
        of(artistPagination),
    };
    // TOOD: interface ?
    const clientProxyRelationMock = {
      send: (): Observable<DataPaginationResDto<RelationEntityReqDto>> =>
        of(relationPagination),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);

    const dto: ArtistFollowingReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.following(dto)).toEqual(artistPagination);
  });

  it("trending should equal list of artists", async () => {
    // TOOD: interface ?
    const clientProxyDataMock = {
      send: (): Observable<DataPaginationResDto<ArtistResDto>> =>
        of(artistPagination),
    };
    // TOOD: interface ?
    const clientProxyRelationMock = {
      send: (): Observable<DataPaginationResDto<RelationEntityReqDto>> =>
        of(relationPagination),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);

    const dto: ArtistTrendingReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
    };
    expect(await service.trending(dto)).toEqual(artistPagination);
  });

  it("trendingGenre should equal list of artists", async () => {
    // TOOD: interface ?
    const clientProxyDataMock = {
      send: (): Observable<DataPaginationResDto<ArtistResDto>> =>
        of(artistPagination),
    };
    // TOOD: interface ?
    const clientProxyRelationMock = {
      send: (): Observable<DataPaginationResDto<RelationEntityReqDto>> =>
        of(relationPagination),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);

    const dto: ArtistTrendingGenreReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      genre: "",
    };
    expect(await service.trendingGenre(dto)).toEqual(artistPagination);
  });

  it("unfollow should be equal to an artist", async () => {
    // TOOD: interface ?
    const clientProxyDataMock = {
      send: (): Observable<ArtistResDto> => of(artist),
    };
    // TOOD: interface ?
    const clientProxyRelationMock = {
      send: (): Observable<boolean> => of(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);

    const dto: ArtistUnfollowReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await service.unfollow(dto)).toEqual(artist);
  });

  it("following should equal list of artists 4", async () => {
    // TOOD: interface ?
    const clientProxyDataMock = {
      send: (): Observable<DataPaginationResDto<ArtistResDto>> =>
        of(artistPagination),
    };
    // TOOD: interface ?
    const clientProxyRelationMock = {
      send: (): Observable<DataPaginationResDto<RelationEntityReqDto>> =>
        of({
          results: [] as RelationEntityReqDto[],
          total: 0,
        } as DataPaginationResDto<RelationEntityReqDto>),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);

    const dto: ArtistFollowingReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.following(dto)).toEqual({
      results: [] as ArtistResDto[],
      total: 0,
    } as DataPaginationResDto<ArtistResDto>);
  });
});
