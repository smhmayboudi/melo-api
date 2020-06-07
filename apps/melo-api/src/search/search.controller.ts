import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  SearchMoodParamReqDto,
  SearchMoodQueryReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";

import { AuthGuard } from "@nestjs/passport";
import { SearchHashIdInterceptor } from "./search.hash-id.interceptor";
import { SearchService } from "./search.service";

@UseInterceptors(SearchHashIdInterceptor)
@ApiBearerAuth("jwt")
@ApiTags("search")
@Controller("search")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("query/:query/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async query(@Param() dto: SearchQueryReqDto): Promise<SearchResDto[]> {
    return this.searchService.query(dto);
  }

  @Get("mood/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async mood(
    @Param() paramDto: SearchMoodParamReqDto,
    @Query() queryDto: SearchMoodQueryReqDto
  ): Promise<SongResDto[]> {
    return this.searchService.mood({
      ...paramDto,
      ...queryDto,
    });
  }
}
