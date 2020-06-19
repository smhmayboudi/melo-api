import {
  ARTIST_SERVICE,
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  CONST_SERVICE,
  ConstImageResDto,
  SONG_SERVICE,
  SearchElasticsearchArtistResDto,
  SearchElasticsearchSearchResDto,
  SearchType,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { AlbumConfigService } from "./album.config.service";
import { AlbumConfigServiceInterface } from "./album.config.service.interface";
import { AlbumService } from "./album.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("AlbumService", () => {
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
  const album: AlbumResDto = {
    artists: [artist],
    downloadCount: 0,
    id: 0,
    image,
    name: "",
    releaseDate,
    tags: [""],
    tracksCount: 0,
  };
  const audio: SongAudioResDto = {
    medium: {
      fingerprint: "",
      url: "-0.mp3",
    },
  };
  const song: SongResDto = {
    album,
    artists: [artist],
    audio,
    copyrighted: false,
    downloadCount: 0,
    duration: 0,
    hasVideo: false,
    id: 0,
    image,
    localized: false,
    lyrics: "",
    releaseDate,
    tags: [""],
    title: "",
  };

  // TODO: interface ?
  const artistClientProxyMock = {
    send: () => of(artist),
  };
  const albumConfigServiceMock: AlbumConfigServiceInterface = {
    elasticsearchNode: "",
    imagePath: "",
    imagePathDefaultAlbum: "",
    indexName: "",
    maxSize: 0,
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
  };
  // TODO: interface ?
  const constClientProxyMock = {
    send: () => of(image),
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    get: () => Promise.resolve(elasticGetRes),
    search: () => Promise.resolve(elasticSearchRes),
  };
  // TODO: interface ?
  const songClientProxyMock = {
    send: () => of([song]),
  };

  let service: AlbumService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AlbumService,
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        { provide: AlbumConfigService, useValue: albumConfigServiceMock },
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
      ],
    }).compile();
    service = module.get<AlbumService>(AlbumService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("albums should equal list of artists", async () => {
    const dto: AlbumArtistsReqDto = {
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.albums(dto)).toEqual([album]);
  });

  it.todo("albums should equal list of albums artists undefined");

  it("get should be equal to an artist", async () => {
    const dto: AlbumGetReqDto = {
      id: 0,
    };
    expect(await service.get(dto)).toEqual({
      ...album,
      songs: [song],
    });
  });

  it("latest should equal list of albums", async () => {
    const dto: AlbumLatestReqDto = {
      from: 0,
      language: "",
      size: 0,
    };
    expect(await service.latest(dto)).toEqual([album]);
  });

  it("latest should equal list of albums 2", async () => {
    const dto: AlbumLatestReqDto = {
      from: 0,
      language: "all",
      size: 0,
    };
    expect(await service.latest(dto)).toEqual([album]);
  });

  it("transform should be equal to an album", async () => {
    const dto: SearchElasticsearchSearchResDto = searchElastic;
    expect(await service.transform(dto)).toEqual(album);
  });

  it("transform should be equal to an album 2", async () => {
    const dto: SearchElasticsearchSearchResDto = {
      ...searchElastic,
      tags: undefined,
      unique_name: undefined,
    };
    expect(await service.transform(dto)).toEqual({
      ...album,
      tags: undefined,
    });
  });
});
