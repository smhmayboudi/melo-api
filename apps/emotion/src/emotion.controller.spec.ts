import {
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  EmotionConfigReqDto,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { EmotionController } from "./emotion.controller";
import { EmotionService } from "./emotion.service";
import { EmotionServiceInterface } from "./emotion.service.interface";

describe("EmotionController", () => {
  const config: EmotionConfigReqDto = {
    indexName: "",
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
  const emotionPagination: DataPaginationResDto<EmotionEmotionsResDto> = {
    results: [emotion],
    total: 1,
  } as DataPaginationResDto<EmotionEmotionsResDto>;

  const emotionServiceMock: EmotionServiceInterface = {
    emotions: (): Promise<DataPaginationResDto<EmotionEmotionsResDto>> =>
      Promise.resolve(emotionPagination),
  };

  let controller: EmotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionController],
      providers: [{ provide: EmotionService, useValue: emotionServiceMock }],
    }).compile();
    controller = module.get<EmotionController>(EmotionController);
  });

  it("emotions should return a list of emotions", async () => {
    const dto: EmotionEmotionsReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      emotions: [""],
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await controller.emotions(dto)).toEqual(emotionPagination);
  });
});
