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

import { EmotionController } from "./emotion.controller";
import { EmotionService } from "./emotion.service";
import { EmotionServiceInterface } from "./emotion.service.interface";

describe("EmotionController", () => {
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
  const emotionServiceMock: EmotionServiceInterface = {
    emotions: (): Promise<EmotionEmotionsResDto[]> =>
      Promise.resolve([emotion]),
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
      dataConfigElasticsearch,
      dataConfigImage,
      emotions: [""],
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await controller.emotions(dto)).toEqual([emotion]);
  });
});
