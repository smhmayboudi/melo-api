import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
// import { Counter } from "prom-client";
import { map } from "rxjs/operators";
// import { InjectCounter } from "../prom/prom.decorators";
import { DataConfigService } from "./data.config.service";
// import { DataModule } from "./data.module";
import { DataSearchQueryReqDto } from "./dto/req/data.search.query.req.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "./dto/res/data.search.res.dto";

@Injectable()
export class DataSearchService {
  constructor(
    // @InjectCounter("data")
    // private readonly counter: Counter,
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  async query(
    dto: DataSearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>> {
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSearchService.name,
    //   function: this.query.name
    // });
    return this.httpService
      .get(
        `${this.dataConfigService.url}/search/query/${dto.query}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSearchResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }
}
