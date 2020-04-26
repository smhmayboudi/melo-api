import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchMoodReqDto } from "./dto/req/data.search.mood.req.dto";
import { DataSearchQueryReqDto } from "./dto/req/data.search.query.req.dto";
import { DataSearchResDto } from "./dto/res/data.search.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";

export interface DataSearchServiceInterface {
  query(
    dto: DataSearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>>;
  mood(
    dto: DataSearchMoodReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>>;
}
