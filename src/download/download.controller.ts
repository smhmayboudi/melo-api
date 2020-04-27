import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DownloadHashIdInterceptor } from "./download.hash-id.interceptor";
import { DownloadLikeInterceptor } from "./download.like.interceptor";
import { DownloadOrderByPipe } from "./download.order-by.pipe";
import { DownloadOrderByType } from "./download.order-by.type";
import { DownloadService } from "./download.service";
import { DownloadSongParamReqDto } from "./dto/req/download.song.param.req.dto";
import { DownloadSongQueryReqDto } from "./dto/req/download.song.query.req.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { DownloadSortByPipe } from "./download.sort-by.pipe";
import { DownloadSortByType } from "./download.sort-by.type";

@UseInterceptors(DownloadLikeInterceptor, DownloadHashIdInterceptor)
@ApiBearerAuth("jwt")
@ApiTags("download")
@Controller("download")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get("song/:orderBy/:sortBy/:from/:limit")
  @UseGuards(AuthGuard("jwt"))
  async downloadedSongs(
    @Param() paramDto: DownloadSongParamReqDto,
    @Query() queryDto: DownloadSongQueryReqDto,
    @Param("orderBy", DownloadOrderByPipe) orderBy: DownloadOrderByType,
    @Param("sortBy", DownloadSortByPipe) sortBy: DownloadSortByType,
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
