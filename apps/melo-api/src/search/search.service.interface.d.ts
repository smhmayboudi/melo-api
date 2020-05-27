import {
  DataPaginationResDto,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";

export interface SearchServiceInterface {
  mood(dto: SearchMoodReqDto): Promise<DataPaginationResDto<SongResDto>>;
  query(dto: SearchQueryReqDto): Promise<DataPaginationResDto<SearchResDto>>;
}
