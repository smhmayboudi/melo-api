import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  DownloadOrderByType,
  DownloadSongParamReqDto,
  DownloadSongQueryReqDto,
  DownloadSongResDto,
  SONG_SERVICE,
  SearchElasticsearchArtistResDto,
  SearchElasticsearchSearchResDto,
  SearchType,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { DownloadConfigService } from "./download.config.service";
import { DownloadConfigServiceInterface } from "./download.config.service.interface";
import { DownloadService } from "./download.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("DownloadService", () => {
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
  // TODO: interface?
  const downloadElasticsearch = {
    body: {
      hits: {
        hits: [
          {
            _source: {
              date: releaseDate,
              song_id: 0,
              user_id: 0,
            },
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
  const downloadSong: DownloadSongResDto = {
    downloadedAt: releaseDate,
    song,
  };

  // TODO: interface ?
  const songClientProxyMock = {
    send: () => of(song),
  };
  // TODO: interface ?
  const downloadConfigServiceMock: DownloadConfigServiceInterface = {
    elasticsearchNode: "",
    indexName: "",
    maxSize: 0,
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    get: () => Promise.resolve(elasticGetRes),
    search: () => Promise.resolve(downloadElasticsearch),
  };

  let service: DownloadService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DownloadService,
        { provide: DownloadConfigService, useValue: downloadConfigServiceMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
      ],
    }).compile();
    service = module.get<DownloadService>(DownloadService);
  });

  it("downloadedSongs should return an array of songId and dates", async () => {
    const paramDto: DownloadSongParamReqDto = {
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
    };
    const queryDto: DownloadSongQueryReqDto = {
      filter: "",
    };
    expect(
      await service.downloadedSongs({
        ...paramDto,
        ...queryDto,
        orderBy: DownloadOrderByType.asc,
        sub: 1,
      })
    ).toEqual([downloadSong]);
  });

  it("downloadedSongs should return an array of songId and dates 2", async () => {
    const paramDto: DownloadSongParamReqDto = {
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
    };
    const queryDto: DownloadSongQueryReqDto = {
      filter: undefined,
    };
    expect(
      await service.downloadedSongs({
        ...paramDto,
        ...queryDto,
        orderBy: DownloadOrderByType.asc,
        sub: 1,
      })
    ).toEqual([downloadSong]);
  });
});
