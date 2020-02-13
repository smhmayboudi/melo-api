import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { Injectable } from "@nestjs/common";
import { DataSearchService } from "../data/data.search.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchModule } from "./search.module";

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
    this.counterMetric.inc({
      module: SearchModule.name,
      service: SearchService.name,
      function: this.query.name
    });
    return this.dataSearchService.query({ ...dto });
  }
}
