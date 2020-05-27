import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  PlaylistAddSongReqDto,
  PlaylistConfigReqDto,
  PlaylistCreateReqDto,
  PlaylistDeleteReqDto,
  PlaylistEditReqDto,
  PlaylistGetReqDto,
  PlaylistMyReqDto,
  PlaylistRemoveSongReqDto,
  PlaylistResDto,
  PlaylistTopReqDto,
} from "@melo/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { DataConfigService } from "../data/data.config.service";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistHashIdInterceptor } from "./playlist.hash-id.interceptor";
import { PlaylistLikeInterceptor } from "./playlist.like.interceptor";
import { PlaylistLocalizeInterceptor } from "./playlist.localize.interceptor";
import { PlaylistService } from "./playlist.service";

@UseInterceptors(
  PlaylistLikeInterceptor,
  PlaylistLocalizeInterceptor,
  PlaylistHashIdInterceptor
)
@ApiBearerAuth("jwt")
@ApiTags("playlist")
@Controller("playlist")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class PlaylistController {
  private config: PlaylistConfigReqDto = {
    imagePath: this.playlistConfigService.imagePath,
    imagePathDefaultPlaylist: this.playlistConfigService
      .imagePathDefaultPlaylist,
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
    private readonly playlistConfigService: PlaylistConfigService,
    private readonly playlistService: PlaylistService
  ) {}

  @ApiParam({
    name: "songId",
    type: String,
  })
  @Post("addSong")
  @UseGuards(AuthGuard("jwt"))
  async addSong(@Body() dto: PlaylistAddSongReqDto): Promise<PlaylistResDto> {
    return this.playlistService.addSong({
      ...dto,
      config: this.config,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Post("create")
  @UseGuards(AuthGuard("jwt"))
  async create(
    @Body() dto: PlaylistCreateReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<PlaylistResDto> {
    return this.playlistService.create({
      ...dto,
      config: this.config,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
      sub,
    });
  }

  @Delete("byId/:id")
  @UseGuards(AuthGuard("jwt"))
  async delete(
    @Param() dto: PlaylistDeleteReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<PlaylistResDto> {
    return this.playlistService.delete({
      ...dto,
      config: this.config,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
      sub,
    });
  }

  @Post("edit")
  @UseGuards(AuthGuard("jwt"))
  async edit(@Body() dto: PlaylistEditReqDto): Promise<PlaylistResDto> {
    return this.playlistService.edit({
      ...dto,
      config: this.config,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Get("byId/:id")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async get(@Param() dto: PlaylistGetReqDto): Promise<PlaylistResDto> {
    return this.playlistService.get({
      ...dto,
      config: this.config,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Get("my/:from/:size")
  @UseGuards(AuthGuard("jwt"))
  async my(
    @Param() dto: PlaylistMyReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<PlaylistResDto>> {
    return this.playlistService.my({
      ...dto,
      config: this.config,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,

      sub,
    });
  }

  @ApiParam({
    name: "songId",
    type: String,
  })
  @Delete("song/:playlistId/:songId")
  @UseGuards(AuthGuard("jwt"))
  async removeSong(
    @Param() dto: PlaylistRemoveSongReqDto
  ): Promise<PlaylistResDto> {
    return this.playlistService.removeSong({
      ...dto,
      config: this.config,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Get("top/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async top(
    @Param() dto: PlaylistTopReqDto
  ): Promise<DataPaginationResDto<PlaylistResDto>> {
    return this.playlistService.top({
      ...dto,
      config: this.config,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
    });
  }
}
