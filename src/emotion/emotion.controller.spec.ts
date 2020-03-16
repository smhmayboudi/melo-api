import { Test, TestingModule } from "@nestjs/testing";

import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { EmotionController } from "./emotion.controller";
import { EmotionParamReqDto } from "./dto/req/emotion.param.req.dto";
import { EmotionQueryReqDto } from "./dto/req/emotion.query.req.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { EmotionService } from "./emotion.service";
import { EmotionServiceInterface } from "./emotion.service.interface";

describe("EmotionController", () => {
  const emotion: EmotionResDto = {
    emotions: [""],
    songId: 0
  };
  const emotionPagination: DataPaginationResDto<EmotionResDto> = {
    results: [emotion],
    total: 1
  } as DataPaginationResDto<EmotionResDto>;

  const emotionServiceMock: EmotionServiceInterface = {
    emotions: (): Promise<DataPaginationResDto<EmotionResDto>> =>
      Promise.resolve(emotionPagination)
  };

  let controller: EmotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionController],
      providers: [{ provide: EmotionService, useValue: emotionServiceMock }]
    }).compile();
    controller = module.get<EmotionController>(EmotionController);
  });

  it("emotions should return a list of emotions", async () => {
    const paramDto: EmotionParamReqDto = {
      from: 0,
      limit: 0
    };
    const queryDto: EmotionQueryReqDto = {
      emotions: [""]
    };
    expect(await controller.emotions(paramDto, queryDto, 0)).toEqual(
      emotionPagination
    );
  });
});
