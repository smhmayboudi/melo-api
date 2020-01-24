import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { SearchMusicDto } from "../data/dto/search.music.dto";
import { SongDto } from "../data/dto/song.dto";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { SearchService } from "./search.service";

@ApiBearerAuth("jwt")
@ApiTags("search")
@Controller("search")
@UseFilters(HttpExceptionFilter)
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
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<SongDto>> {
    return this.searchService.mood({
      from,
      limit
    });
  }

  @Get("query/:query/:from/:limit")
  async query(
    @Param("query") query: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<SearchMusicDto>> {
    return this.searchService.query({
      query,
      from,
      limit
    });
  }
}
