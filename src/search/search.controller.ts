import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchService } from "./search.service";

@ApiBearerAuth("jwt")
@ApiTags("search")
@Controller("search")
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
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async query(
    @Param() dto: SearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>> {
    return this.searchService.query(dto);
  }
}
