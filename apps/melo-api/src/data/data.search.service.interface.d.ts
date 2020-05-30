import {
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";

export interface DataSearchServiceInterface {
  query(dto: SearchQueryReqDto): Promise<SearchResDto[]>;
  mood(dto: SearchMoodReqDto): Promise<SongResDto[]>;
}
