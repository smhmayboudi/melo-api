import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchQueryReqDto } from "./dto/req/data.search.query.req.dto";
import { DataSearchResDto } from "./dto/res/data.search.res.dto";

export interface DataSearchServiceInterface {
  query(
    dto: DataSearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>>;
}
