import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { SearchMoodParamReqDto } from "./dto/req/search.mood.param.req.dto";
import { SearchMoodQueryReqDto } from "./dto/req/search.mood.query.req.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchPaginationResDto } from "./dto/res/search.pagination.res.dto";
import { SearchSearchResDto } from "./dto/res/search.search.res.dto";
import { SearchSongResDto } from "./dto/res/search.song.res.dto";
import { SearchService } from "./search.service";

@ApiBearerAuth("jwt")
@ApiTags("search")
@Controller("search")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(ClassSerializerInterceptor, ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("mood/:from/:limit")
  async mood(
    @Param() paramDto: SearchMoodParamReqDto,
    @Query() querydto: SearchMoodQueryReqDto
  ): Promise<SearchPaginationResDto<SearchSongResDto>> {
    return this.searchService.mood(paramDto, querydto);
  }

  @Get("query/:query/:from/:limit")
  async query(
    @Param() dto: SearchQueryReqDto
  ): Promise<SearchPaginationResDto<SearchSearchResDto>> {
    return this.searchService.query(dto);
  }
}
