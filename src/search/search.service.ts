import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { Injectable } from "@nestjs/common";
import { DataSearchService } from "../data/data.search.service";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";

@Injectable()
export class SearchService {
  constructor(
    @InjectCounterMetric("search_counter")
    private readonly counterMetric: CounterMetric,
    private readonly dataSearchService: DataSearchService
  ) {}

  async query(
    dto: SearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>> {
    this.counterMetric.inc(
      { module: "search", service: "search", function: "query" },
      1,
      Date.now()
    );
    return this.dataSearchService.query({ ...dto });
  }
}
