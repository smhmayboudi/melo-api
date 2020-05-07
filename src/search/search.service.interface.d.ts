import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { SearchMoodParamDto } from "./dto/req/search.mood.param.req.dto";
import { SearchMoodQueryDto } from "./dto/req/search.mood.query.req.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";

export interface SearchServiceInterface {
  mood(
    paramDto: SearchMoodParamDto,
    queryDto: SearchMoodQueryDto
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  query(
    dto: SearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>>;
}
