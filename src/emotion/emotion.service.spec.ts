import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AxiosResponse } from "axios";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionParamReqDto } from "./dto/req/emotion.param.req.dto";
import { EmotionQueryReqDto } from "./dto/req/emotion.query.req.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { EmotionService } from "./emotion.service";
import { HttpService } from "@nestjs/common";

describe("EmotionService", () => {
  const emotion: EmotionResDto = {
    emotions: [""],
    songId: 0
  };
  const emotionPagination: DataPaginationResDto<EmotionResDto> = {
    results: [emotion],
    total: 1
  } as DataPaginationResDto<EmotionResDto>;

  // TODO: interface ?
  const httpServiceMock = {
    get: (): Observable<AxiosResponse<DataPaginationResDto<EmotionResDto>>> =>
      of({
        config: {},
        data: emotionPagination,
        headers: {},
        status: 200,
        statusText: ""
      })
  };

  let service: EmotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmotionService,
        { provide: EmotionConfigService, useValue: {} },
        { provide: HttpService, useValue: httpServiceMock }
      ]
    }).compile();
    service = module.get<EmotionService>(EmotionService);
  });

  it("emotions should return a list of emotions", async () => {
    const paramDto: EmotionParamReqDto = {
      from: 0,
      limit: 0
    };
    const queryDto: EmotionQueryReqDto = {
      emotions: [""]
    };
    expect(await service.emotions(paramDto, queryDto, 0)).toEqual(
      emotionPagination
    );
  });
});
