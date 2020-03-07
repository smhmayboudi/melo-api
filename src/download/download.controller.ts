import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { AppUser } from "../app/app.user.decorator";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DownloadOrderByPipe } from "./downlaod.order-by.pipe";
import { DownloadOrderByType } from "./download.order-by.type";
import { DownloadService } from "./download.service";
import { DownloadSortByPipe } from "./download.sort-by.pipe";
import { DownloadSortByType } from "./download.sort-by.type";
import { DownloadSongParamReqDto } from "./dto/req/download.song.param.req.dto";
import { DownloadSongQueryReqDto } from "./dto/req/download.song.query.req.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";

@ApiBearerAuth("jwt")
@ApiTags("download")
@Controller("download")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @ApiParam({
    name: "orderBy",
    type: String
  })
  @ApiParam({
    name: "sortBy",
    type: String
  })
  @Get("song/:orderBy/:sortBy/:from/:limit")
  @UseGuards(AuthGuard("jwt"))
  async downloadedSongs(
    @Param() paramDto: DownloadSongParamReqDto,
    @Param("orderBy", DownloadOrderByPipe) orderBy: DownloadOrderByType,
    @Param("sortBy", DownloadSortByPipe) sortBy: DownloadSortByType,
    @Query() queryDto: DownloadSongQueryReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DownloadSongResDto>> {
    return this.downloadService.downloadedSongs(
      paramDto,
      queryDto,
      orderBy,
      sortBy,
      sub
    );
  }
}
