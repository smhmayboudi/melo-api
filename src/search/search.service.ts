import { Injectable } from "@nestjs/common";
import { DataSearchService } from "../data/data.search.service";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchPaginationResDto } from "./dto/res/search.pagination.res.dto";
import { SearchSearchResDto } from "./dto/res/search.search.res.dto";

@Injectable()
export class SearchService {
  constructor(private readonly dataSearchService: DataSearchService) {}

  async query(
    dto: SearchQueryReqDto
  ): Promise<SearchPaginationResDto<SearchSearchResDto>> {
    return (this.dataSearchService.query({ ...dto }) as unknown) as Promise<
      SearchPaginationResDto<SearchSearchResDto>
    >;
  }
}
