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
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  DownloadConfigReqDto,
  DownloadOrderByType,
  DownloadSongParamReqDto,
  DownloadSongQueryReqDto,
  DownloadSongResDto,
} from "@melo/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { DataConfigService } from "../data/data.config.service";
import { DownloadConfigService } from "./download.config.service";
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
  private config: DownloadConfigReqDto = {
    indexName: this.downloadConfigService.indexName,
    maxSize: this.downloadConfigService.maxSize,
  };
  private dataConfigElasticSearch: DataConfigElasticSearchReqDto = {
    imagePath: this.dataConfigService.imagePath,
    imagePathDefaultAlbum: this.dataConfigService.imagePathDefaultAlbum,
    imagePathDefaultArtist: this.dataConfigService.imagePathDefaultArtist,
    imagePathDefaultSong: this.dataConfigService.imagePathDefaultSong,
    indexName: this.dataConfigService.indexName,
    maxSize: this.dataConfigService.maxSize,
    mp3Endpoint: this.dataConfigService.mp3Endpoint,
  };
  private dataConfigImage: DataConfigImageReqDto = {
    imageBaseUrl: this.dataConfigService.imageBaseUrl,
    imageEncode: this.dataConfigService.imageEncode,
    imageKey: this.dataConfigService.imageKey,
    imageSalt: this.dataConfigService.imageSalt,
    imageSignatureSize: this.dataConfigService.imageSignatureSize,
    imageTypeSize: this.dataConfigService.imageTypeSize,
  };

  constructor(
    private readonly dataConfigService: DataConfigService,
    private readonly downloadConfigService: DownloadConfigService,
    private readonly downloadService: DownloadService
  ) {}

  @Get("song/:orderBy/:from/:size")
  @UseGuards(AuthGuard("jwt"))
  async downloadedSongs(
    @AppUser("sub", ParseIntPipe) sub: number,
    @Param("orderBy", DownloadOrderByPipe) orderBy: DownloadOrderByType,
    @Param() paramDto: DownloadSongParamReqDto,
    @Query() queryDto: DownloadSongQueryReqDto
  ): Promise<DataPaginationResDto<DownloadSongResDto>> {
    return this.downloadService.downloadedSongs({
      ...paramDto,
      ...queryDto,
      config: this.config,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
      orderBy,
      sub,
    });
  }
}
