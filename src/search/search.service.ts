import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchService } from "../data/data.search.service";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";
import { SearchMoodParamDto } from "./dto/req/search.mood.param.req.dto";
import { SearchMoodQueryDto } from "./dto/req/search.mood.query.req.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchServiceInterface } from "./search.service.interface";

@Injectable()
// @PromInstanceCounter
export class SearchService implements SearchServiceInterface {
  constructor(private readonly dataSearchService: DataSearchService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async query(
    dto: SearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>> {
    return this.dataSearchService.query({ ...dto });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(
    paramDto: SearchMoodParamDto,
    querydto: SearchMoodQueryDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.dataSearchService.mood({
      ...paramDto,
      ...querydto,
    });
  }
}
