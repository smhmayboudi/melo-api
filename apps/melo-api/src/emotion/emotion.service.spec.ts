import {
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  EmotionConfigReqDto,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ElasticsearchService } from "@nestjs/elasticsearch";
import { EmotionService } from "./emotion.service";
import { SongService } from "../song/song.service";
import { SongServiceInterface } from "../song/song.service.interface";

describe("EmotionService", () => {
  const config: EmotionConfigReqDto = {
    indexName: "",
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
  const releaseDate = new Date();
  const song: SongResDto = {
    artists: [
      {
        followersCount: 0,
        id: 0,
        type: DataArtistType.feat,
      },
    ],
    audio: {},
    duration: 0,
    id: 0,
    localized: false,
    releaseDate,
    title: "",
  };
  const emotions: EmotionEmotionsResDto = {
    emotions: [""],
    song,
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

  // TODO: interface ?
  const elasticsearchServiceMock = {
    search: (): any => Promise.resolve(emotionElasticsearch),
  };
  const songServiceMock: SongServiceInterface = {
    artistSongs: (): Promise<SongResDto[]> => Promise.resolve([song]),
    artistSongsTop: (): Promise<SongResDto[]> => Promise.resolve([song]),
    genre: (): Promise<SongResDto[]> => Promise.resolve([song]),
    get: (): Promise<SongResDto> => Promise.resolve(song),
    language: (): Promise<SongResDto[]> => Promise.resolve([song]),
    like: (): Promise<SongResDto> => Promise.resolve(song),
    liked: (): Promise<SongResDto[]> => Promise.resolve([song]),
    mood: (): Promise<SongResDto[]> => Promise.resolve([song]),
    newPodcast: (): Promise<SongResDto[]> => Promise.resolve([song]),
    newSong: (): Promise<SongResDto[]> => Promise.resolve([song]),
    podcast: (): Promise<SongResDto[]> => Promise.resolve([song]),
    sendTelegram: (): Promise<void> => Promise.resolve(undefined),
    similar: (): Promise<SongResDto[]> => Promise.resolve([song]),
    slider: (): Promise<SongResDto[]> => Promise.resolve([song]),
    topDay: (): Promise<SongResDto[]> => Promise.resolve([song]),
    topWeek: (): Promise<SongResDto[]> => Promise.resolve([song]),
    unlike: (): Promise<SongResDto> => Promise.resolve(song),
  };

  let service: EmotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmotionService,
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: SongService, useValue: songServiceMock },
      ],
    }).compile();
    service = module.get<EmotionService>(EmotionService);
  });

  it("emotions should return a list of emotions", async () => {
    const dto: EmotionEmotionsReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      emotions: [""],
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.emotions(dto)).toEqual([emotions]);
  });
});
