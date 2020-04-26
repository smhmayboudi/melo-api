import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { HttpService, Injectable } from "@nestjs/common";

import { DataConfigService } from "./data.config.service";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchMoodReqDto } from "./dto/req/data.search.mood.req.dto";
import { DataSearchQueryReqDto } from "./dto/req/data.search.query.req.dto";
import { DataSearchResDto } from "./dto/res/data.search.res.dto";
import { DataSearchServiceInterface } from "./data.search.service.interface";
import { DataSongResDto } from "./dto/res/data.song.res.dto";
import { PromMethodCounter } from "../prom/prom.decorator";
import { map } from "rxjs/operators";

@Injectable()
// @PromInstanceCounter
export class DataSearchService implements DataSearchServiceInterface {
  constructor(
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async query(
    dto: DataSearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>> {
    return this.httpService
      .get<DataPaginationResDto<DataSearchResDto>>(
        `${this.dataConfigService.url}/search/query/${dto.query}/${dto.from}/${dto.limit}`
      )
      .pipe(map((value) => value.data))
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(
    dto: DataSearchMoodReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get<DataPaginationResDto<DataSongResDto>>(
        `${this.dataConfigService.url}/search/mood/${dto.from}/${dto.limit}`,
        {
          params: {
            classy: dto.classy,
            date: dto.date,
            energetic: dto.energetic,
            happiness: dto.happiness,
            romantic: dto.romantic,
          },
        }
      )
      .pipe(map((value) => value.data))
      .toPromise();
  }
}
