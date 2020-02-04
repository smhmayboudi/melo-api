import { Injectable } from "@nestjs/common";
import { DataSearchService } from "../data/data.search.service";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";

@Injectable()
export class SearchService {
  constructor(private readonly dataSearchService: DataSearchService) {}

  async query(
    dto: SearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>> {
    return this.dataSearchService.query({ ...dto });
  }
}
