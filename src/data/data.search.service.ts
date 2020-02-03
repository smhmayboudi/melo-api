import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataConfigService } from "./data.config.service";
import { DataSearchQueryReqDto } from "./dto/req/data.search.query.req.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "./dto/res/data.search.res.dto";

@Injectable()
export class DataSearchService {
  constructor(
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  async query(
    dto: DataSearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>> {
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
