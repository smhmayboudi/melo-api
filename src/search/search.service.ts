import { Injectable } from "@nestjs/common";
import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { DataSearchService } from "../data/data.search.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
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
}
