import {
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  EmotionConfigReqDto,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
  SONG_SERVICE,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ElasticsearchService } from "@nestjs/elasticsearch";
import { EmotionService } from "./emotion.service";
import { of } from "rxjs";

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
  const emotion: EmotionEmotionsResDto = {
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
  const songClientProxyMock = {
    send: () => of(song),
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    search: (): any => Promise.resolve(emotionElasticsearch),
  };

  let service: EmotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmotionService,
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
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
    expect(await service.emotions(dto)).toEqual([emotion]);
  });
});
