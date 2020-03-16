import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { EmotionServiceInterface } from "./emotion.service.interface";
import { EmotionController } from "./emotion.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { EmotionService } from "./emotion.service";
import { EmotionParamReqDto } from "./dto/req/emotion.param.req.dto";
import { EmotionQueryReqDto } from "./dto/req/emotion.query.req.dto";

describe("EmotionController", () => {
  const emotion: EmotionResDto = {
    songId: 0,
    emotions: [""]
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
