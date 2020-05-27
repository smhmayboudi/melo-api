import {
  DataPaginationResDto,
  SEARCH_SERVICE_MOOD,
  SEARCH_SERVICE_QUERY,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern(SEARCH_SERVICE_QUERY)
  query(
    @Payload() dto: SearchQueryReqDto
  ): Promise<DataPaginationResDto<SearchResDto>> {
    return this.searchService.query(dto);
  }

  @MessagePattern(SEARCH_SERVICE_MOOD)
  mood(
    @Payload() dto: SearchMoodReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.searchService.mood(dto);
  }
}
