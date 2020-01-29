import { Injectable } from "@nestjs/common";
import { DataSearchService } from "../data/data.search.service";
import { SearchMoodParamReqDto } from "./dto/req/search.mood.param.req.dto";
import { SearchMoodQueryReqDto } from "./dto/req/search.mood.query.req.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchPaginationResDto } from "./dto/res/search.pagination.res.dto";
import { SearchSearchMusicResDto } from "./dto/res/search.search-music.res.dto";
import { SearchSongResDto } from "./dto/res/search.song.res.dto";

@Injectable()
export class SearchService {
  constructor(private readonly dataSearchService: DataSearchService) {}

  async mood(
    paramDto: SearchMoodParamReqDto,
    querydto: SearchMoodQueryReqDto
  ): Promise<SearchPaginationResDto<SearchSongResDto>> {
    return (this.dataSearchService.mood({
      ...paramDto,
      ...querydto
    }) as unknown) as Promise<SearchPaginationResDto<SearchSongResDto>>;
  }

  async query(
    dto: SearchQueryReqDto
  ): Promise<SearchPaginationResDto<SearchSearchMusicResDto>> {
    return (this.dataSearchService.query({ ...dto }) as unknown) as Promise<
      SearchPaginationResDto<SearchSearchMusicResDto>
    >;
  }
}
