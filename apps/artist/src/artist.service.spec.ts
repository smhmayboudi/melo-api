import {
  ARTIST_SERVICE,
  ARTIST_SERVICE_GET,
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistType,
  ArtistUnfollowReqDto,
  CONST_SERVICE,
  ConstImageResDto,
  RELATION_SERVICE,
  RELATION_SERVICE_GET,
  RELATION_SERVICE_REMOVE,
  RelationEdgeType,
  RelationEntityReqDto,
  RelationEntityType,
  RelationResDto,
  SearchElasticsearchArtistResDto,
  SearchElasticsearchSearchResDto,
  SearchType,
} from "@melo/common";
import { Observable, of } from "rxjs";

import { ArtistConfigService } from "./artist.config.service";
import { ArtistConfigServiceInterface } from "./artist.config.service.interface";
import { ArtistService } from "./artist.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Test } from "@nestjs/testing";

describe("ArtistService", () => {
  const artistElastic: SearchElasticsearchArtistResDto = {
    available: false,
    followers_count: 0,
    full_name: "",
    has_cover: false,
    id: 0,
    popular: false,
    sum_downloads_count: 1,
    tags: [
      {
        tag: "",
      },
    ],
    type: ArtistType.prime,
  };
  const releaseDate = new Date();
  const searchElastic: SearchElasticsearchSearchResDto = {
    album: "",
    album_downloads_count: 0,
    album_id: 0,
    album_tracks_count: 0,
    artist_followers_count: 0,
    artist_full_name: "",
    artist_id: 0,
    artist_sum_downloads_count: 1,
    artists: [artistElastic],
    copyright: false,
    downloads_count: 0,
    duration: 0,
    has_cover: false,
    has_video: false,
    id: 0,
    localize: false,
    lyrics: "",
    max_audio_rate: 0,
    release_date: releaseDate,
    suggested: 0,
    tags: [
      {
        tag: "",
      },
    ],
    title: "",
    type: SearchType.album,
    unique_name: "",
  };
  // TODO: interface ?
  const elasticGetRes = {
    body: {
      _source: {
        ...searchElastic,
        moods: {
          classy: 0,
        },
      },
    },
  };
  // TODO: interface ?
  const elasticSearchRes = {
    body: {
      hits: {
        hits: [
          {
            _source: searchElastic,
          },
        ],
      },
    },
  };
  // TODO: interface ?
  const elasticArtistRes = {
    body: {
      hits: {
        hits: [
          {
            _source: artistElastic,
          },
        ],
      },
    },
  };
  const image: ConstImageResDto = {
    cover: {
      url:
        "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: ArtistType.prime,
  };
  const artistFollow: ArtistFollowReqDto = {
    id: 0,
    sub: 1,
  };
  const from: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };
  const to: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.album,
  };
  const relation: RelationResDto = {
    from,
    to,
    type: RelationEdgeType.follows,
  };
  // TOOD: interface ?
  const artistClientProxyMock = {
    send: (token: string) =>
      token === ARTIST_SERVICE_GET ? of(artist) : of([artist]),
  };
  const artistConfigServiceMock: ArtistConfigServiceInterface = {
    elasticsearchNode: "",
    imagePath: "",
    imagePathDefaultArtist: "",
    indexName: "",
    maxSize: 0,
  };
  // TODO: interface ?
  const constClientProxyMock = {
    send: () => of(image),
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    get: () => Promise.resolve(elasticGetRes),
    search: (hits) =>
      hits.body.from === undefined
        ? Promise.resolve(elasticSearchRes)
        : Promise.resolve(elasticArtistRes),
  };
  // TOOD: interface ?
  const relationClientProxyMock = {
    send: (token: string) =>
      token === RELATION_SERVICE_GET
        ? of([relation])
        : token === RELATION_SERVICE_REMOVE
        ? of(true)
        : of(artistFollow),
  };

  let service: ArtistService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        { provide: ArtistConfigService, useValue: artistConfigServiceMock },
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
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
      id: 0,
    };
    expect(await service.profile(dto)).toEqual(artist);
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.following(dto)).toEqual([artist]);
  });

  it("following should equal list of artists 2", async () => {
    // TOOD: interface ?
    const relationClientProxyMock = {
      send: (): Observable<RelationResDto[]> => of([]),
    };

    const module = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        { provide: ArtistConfigService, useValue: artistConfigServiceMock },
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);

    const dto: ArtistFollowingReqDto = {
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.following(dto)).toEqual([]);
  });

  it("get should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      id: 0,
    };
    expect(await service.get(dto)).toEqual({
      ...artist,
      image,
    });
  });

  it("transform should be equal to an artist", async () => {
    const dto: SearchElasticsearchArtistResDto = artistElastic;
    expect(await service.transform(dto)).toEqual(artist);
  });

  it("transform should be equal to an artist 2", async () => {
    const dto: SearchElasticsearchArtistResDto = {
      ...artistElastic,
      has_cover: true,
      sum_downloads_count: 0,
      tags: undefined,
    };
    expect(await service.transform(dto)).toEqual({
      ...artist,
      sumSongsDownloadsCount: undefined,
      tags: undefined,
    });
  });

  it("trending should equal list of artists", async () => {
    const dto: ArtistTrendingReqDto = {};
    expect(await service.trending(dto)).toEqual([artist]);
  });

  it("trendingGenre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      genre: "",
    };
    expect(await service.trendingGenre(dto)).toEqual([artist]);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      id: 0,
      sub: 1,
    };
    expect(await service.unfollow(dto)).toEqual(artist);
  });
});
