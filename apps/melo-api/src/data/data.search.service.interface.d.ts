import {
  DataPaginationResDto,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";

export interface DataSearchServiceInterface {
  query(dto: SearchQueryReqDto): Promise<DataPaginationResDto<SearchResDto>>;
  mood(dto: SearchMoodReqDto): Promise<DataPaginationResDto<SongResDto>>;
}
