import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
  SONG_SERVICE,
  SearchElasticsearchArtistResDto,
  SearchElasticsearchSearchResDto,
  SearchType,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { ElasticsearchService } from "@nestjs/elasticsearch";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";
import { EmotionService } from "./emotion.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("EmotionService", () => {
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
  const emotionElasticsearch = {
    body: {
      hits: {
        hits: [
          {
            _source: {
              emotions: [""],
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
  const emotion: EmotionEmotionsResDto = {
    emotions: [""],
    song,
  };

  // TODO: interface ?
  const songClientProxyMock = {
    send: () => of(song),
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    get: () => Promise.resolve(elasticGetRes),
    search: () => Promise.resolve(emotionElasticsearch),
  };
  // TODO: interface ?
  const emotionConfigServiceMock: EmotionConfigServiceInterface = {
    elasticsearchNode: "",
    indexName: "",
    maxSize: 0,
  };

  let service: EmotionService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmotionService,
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: EmotionConfigService, useValue: emotionConfigServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
      ],
    }).compile();
    service = module.get<EmotionService>(EmotionService);
  });

  it("emotions should return a list of emotions", async () => {
    const dto: EmotionEmotionsReqDto = {
      emotions: [""],
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.emotions(dto)).toEqual([emotion]);
  });
});
