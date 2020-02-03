import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchPaginationResDto } from "./dto/res/search.pagination.res.dto";
import { SearchSearchResDto } from "./dto/res/search.search.res.dto";
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

  @Get("query/:query/:from/:limit")
  async query(
    @Param() dto: SearchQueryReqDto
  ): Promise<SearchPaginationResDto<SearchSearchResDto>> {
    return this.searchService.query(dto);
  }
}
