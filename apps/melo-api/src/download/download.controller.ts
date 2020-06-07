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
import {
  DownloadOrderByType,
  DownloadSongParamReqDto,
  DownloadSongQueryReqDto,
  DownloadSongResDto,
} from "@melo/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { DownloadHashIdInterceptor } from "./download.hash-id.interceptor";
import { DownloadLikeInterceptor } from "./download.like.interceptor";
import { DownloadOrderByPipe } from "./download.order-by.pipe";
import { DownloadService } from "./download.service";

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

  @Get("song/:orderBy/:from/:size")
  @UseGuards(AuthGuard("jwt"))
  async downloadedSongs(
    @AppUser("sub", ParseIntPipe) sub: number,
    @Param("orderBy", DownloadOrderByPipe) orderBy: DownloadOrderByType,
    @Param() paramDto: DownloadSongParamReqDto,
    @Query() queryDto: DownloadSongQueryReqDto
  ): Promise<DownloadSongResDto[]> {
    return this.downloadService.downloadedSongs({
      ...paramDto,
      ...queryDto,
      orderBy,
      sub,
    });
  }
}
