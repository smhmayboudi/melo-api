import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  SongArtistSongsReqDto,
  SongArtistSongsTopReqDto,
  SongConfigReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongLikeReqDto,
  SongLikedReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongOrderByType,
  SongPodcastGenresParamReqDto,
  SongPodcastGenresQueryReqDto,
  SongResDto,
  SongSendTelegramReqDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongSongGenresParamReqDto,
  SongSongGenresQueryReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
  SongUnlikeReqDto,
} from "@melo/common";

import { AppOrderByPipe } from "../app/app.order-by.pipe";
import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { DataConfigService } from "../data/data.config.service";
import { SongConfigService } from "./song.config.service";
import { SongHashIdInterceptor } from "./song.hash-id.interceptor";
import { SongLikeInterceptor } from "./song.like.interceptor";
import { SongLocalizeInterceptor } from "./song.localize.interceptor";
import { SongService } from "./song.service";

@UseInterceptors(
  SongLikeInterceptor,
  SongLocalizeInterceptor,
  SongHashIdInterceptor
)
@ApiBearerAuth("jwt")
@ApiTags("song")
@Controller("song")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class SongController {
  private config: SongConfigReqDto = {
    maxSize: this.songConfigService.maxSize,
    sendUrl: this.songConfigService.sendUrl,
  };
  private dataConfigElasticsearch: DataConfigElasticsearchReqDto = {
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
    private readonly songConfigService: SongConfigService,
    private readonly songService: SongService
  ) {}

  @ApiParam({
    example: "abcdef",
    name: "id",
    type: String,
  })
  @Get("artist/[song]/:id/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async artistSongs(
    @Param() dto: SongArtistSongsReqDto
  ): Promise<SongResDto[]> {
    return this.songService.artistSongs({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @ApiParam({
    example: "abcdef",
    name: "id",
    type: String,
  })
  @Get("artist/[song]/top/:id/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async artistSongsTop(
    @Param() dto: SongArtistSongsTopReqDto
  ): Promise<SongResDto[]> {
    return this.songService.artistSongsTop({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @ApiParam({
    name: "orderBy",
    type: String,
  })
  @Get("genre/:orderBy/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async genre(
    @Param("orderBy", AppOrderByPipe) orderBy: SongOrderByType,
    @Param() paramDto: SongSongGenresParamReqDto,
    @Query() queryDto: SongSongGenresQueryReqDto
  ): Promise<SongResDto[]> {
    return this.songService.genre({
      ...paramDto,
      ...queryDto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
      orderBy,
    });
  }

  @ApiParam({
    name: "id",
    type: String,
  })
  @Get("byId/:id")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async get(@Param() dto: SongGetReqDto): Promise<SongResDto> {
    return this.songService.get({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @ApiParam({
    name: "orderBy",
    type: String,
  })
  @Get("language/:language/:orderBy/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async language(
    @Param("orderBy", AppOrderByPipe) orderBy: SongOrderByType,
    @Param() dto: SongLanguageReqDto
  ): Promise<SongResDto[]> {
    return this.songService.language({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
      orderBy,
    });
  }

  @Post("like")
  @UseGuards(AuthGuard("jwt"))
  async like(
    @Body() dto: SongLikeReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<SongResDto> {
    return this.songService.like({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
      sub,
    });
  }

  @Get("liked/:from/:size")
  @UseGuards(AuthGuard("jwt"))
  async liked(
    @Param() dto: SongLikedReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<SongResDto[]> {
    return this.songService.liked({
      ...dto,
      config: this.config,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
      sub,
    });
  }

  @Get("mood/:mood/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async mood(@Param() dto: SongMoodReqDto): Promise<SongResDto[]> {
    return this.songService.mood({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Get("new/podcast/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async newPodcast(@Param() dto: SongNewPodcastReqDto): Promise<SongResDto[]> {
    return this.songService.newPodcast({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Get("new/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async newSong(@Param() dto: SongNewReqDto): Promise<SongResDto[]> {
    return this.songService.newSong({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @ApiParam({
    name: "orderBy",
    type: String,
  })
  @Get("podcast/genres/:orderBy/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async podcast(
    @Param("orderBy", AppOrderByPipe) orderBy: SongOrderByType,
    @Param() paramDto: SongPodcastGenresParamReqDto,
    @Query() queryDto: SongPodcastGenresQueryReqDto
  ): Promise<SongResDto[]> {
    return this.songService.podcast({
      ...paramDto,
      ...queryDto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
      orderBy,
    });
  }

  @Post("send/telegram")
  @UseGuards(AuthGuard("jwt"))
  async sendTelegram(
    @Body() dto: SongSendTelegramReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<void> {
    return this.songService.sendTelegram({
      ...dto,
      config: this.config,
      sub,
    });
  }

  @ApiParam({
    name: "id",
    type: String,
  })
  @Get("similar/:id/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async similar(@Param() dto: SongSimilarReqDto): Promise<SongResDto[]> {
    return this.songService.similar(dto);
  }

  @Get("slider")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async slider(dto: SongSliderReqDto): Promise<SongResDto[]> {
    return this.songService.slider({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Get("top/day/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async topDay(@Param() dto: SongTopDayReqDto): Promise<SongResDto[]> {
    return this.songService.topDay({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Get("top/week/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async topWeek(@Param() dto: SongTopWeekReqDto): Promise<SongResDto[]> {
    return this.songService.topWeek({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Post("unlike")
  @UseGuards(AuthGuard("jwt"))
  async unlike(
    @Body() dto: SongUnlikeReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<SongResDto> {
    return this.songService.unlike({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
      sub,
    });
  }
}
