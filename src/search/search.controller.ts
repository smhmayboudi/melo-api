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

import { AuthGuard } from "@nestjs/passport";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { SearchHashIdInterceptor } from "./search.hash-id.interceptor";
import { SearchMoodParamDto } from "./dto/req/search.mood.param.req.dto";
import { SearchMoodQueryDto } from "./dto/req/search.mood.query.req.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
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
  async query(
    @Param() dto: SearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>> {
    return this.searchService.query(dto);
  }

  @Get("mood/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async searchMood(
    @Param() paramDto: SearchMoodParamDto,
    @Query() queryDto: SearchMoodQueryDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.searchService.mood(paramDto, queryDto);
  }
}
