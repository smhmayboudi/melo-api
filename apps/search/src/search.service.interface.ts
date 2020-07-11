import {
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";

export interface SearchServiceInterface {
  mood(dto: SearchMoodReqDto): Promise<SongResDto[]>;
  query(dto: SearchQueryReqDto): Promise<SearchResDto[]>;
}
