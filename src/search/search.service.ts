import { Injectable } from "@nestjs/common";
// import { Counter } from "prom-client";
import { DataSearchService } from "../data/data.search.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
// import { InjectCounter } from "../prom/prom.decorators";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
// import { SearchModule } from "./search.module";

@Injectable()
export class SearchService {
  constructor(
    // @InjectCounter("search")
    // private readonly counter: Counter,
    private readonly dataSearchService: DataSearchService
  ) {}

  async query(
    dto: SearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>> {
    // this.counter.inc({
    //   module: SearchModule.name,
    //   service: SearchService.name,
    //   function: this.query.name
    // });
    return this.dataSearchService.query({ ...dto });
  }
}
