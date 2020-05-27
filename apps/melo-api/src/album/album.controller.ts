import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
} from "@melo/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AlbumFollowInterceptor } from "./album.follow.interceptor";
import { AlbumHashIdInterceptor } from "./album.hash-id.interceptor";
import { AlbumLikeInterceptor } from "./album.like.interceptor";
import { AlbumLocalizeInterceptor } from "./album.localize.interceptor";
import { AlbumService } from "./album.service";
import { AuthGuard } from "@nestjs/passport";
import { DataConfigService } from "../data/data.config.service";

@UseInterceptors(
  AlbumFollowInterceptor,
  AlbumLikeInterceptor,
  AlbumLocalizeInterceptor,
  AlbumHashIdInterceptor
)
@ApiBearerAuth("jwt")
@ApiTags("album")
@Controller("album")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class AlbumController {
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
    private readonly albumService: AlbumService,
    private readonly dataConfigService: DataConfigService
  ) {}

  @ApiParam({
    example: "abcdef",
    name: "id",
    type: String,
  })
  @Get("artist/albums/:id/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async albums(
    @Param() dto: AlbumArtistsReqDto
  ): Promise<DataPaginationResDto<AlbumResDto>> {
    return this.albumService.albums({
      ...dto,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @ApiParam({
    name: "id",
    type: String,
  })
  @Get("byId/:id")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async get(@Param() dto: AlbumGetReqDto): Promise<AlbumResDto> {
    return this.albumService.get({
      ...dto,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Get("latest/:language/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async latest(
    @Param() dto: AlbumLatestReqDto
  ): Promise<DataPaginationResDto<AlbumResDto>> {
    return this.albumService.latest({
      ...dto,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
    });
  }
}
