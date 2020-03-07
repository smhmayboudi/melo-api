import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";

export interface SearchServiceInterface {
  query(
    dto: SearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>>;
}
