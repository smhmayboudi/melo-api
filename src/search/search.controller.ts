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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { SearchService } from "./search.service";
import { AuthGuard } from "@nestjs/passport";

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
  ): Promise<any> {
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
  ): Promise<any> {
    return this.searchService.query({
      query,
      from,
      limit
    });
  }
}
