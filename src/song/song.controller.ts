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

import { AppOrderByPipe } from "../app/app.order-by.pipe";
import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { DataOrderByType } from "../data/data.order-by.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongNewPodcastReqDto } from "../data/dto/req/data.song.new-podcast.req.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { SongArtistSongsReqDto } from "./dto/req/song.artist-songs.req.dto";
import { SongArtistSongsTopReqDto } from "./dto/req/song.artist-songs-top.req.dto";
import { SongByIdReqDto } from "./dto/req/song.by-id.req.dto";
import { SongHashIdInterceptor } from "./song.hash-id.interceptor";
import { SongLanguageReqDto } from "./dto/req/song.language.req.dto";
import { SongLikeInterceptor } from "./song.like.interceptor";
import { SongLikeReqDto } from "./dto/req/song.like.req.dto";
import { SongLikedReqDto } from "./dto/req/song.liked.req.dto";
import { SongLocalizeInterceptor } from "./song.localize.interceptor";
import { SongMoodReqDto } from "./dto/req/song.mood.req.dto";
import { SongNewReqDto } from "./dto/req/song.new.req.dto";
import { SongPodcastGenresParamReqDto } from "./dto/req/song.podcast.genres.param.req.dto";
import { SongPodcastGenresQueryReqDto } from "./dto/req/song.podcast.genres.query.req.dto";
import { SongSendTelegramReqDto } from "./dto/req/song.send-telegram.req.dto";
import { SongService } from "./song.service";
import { SongSimilarReqDto } from "./dto/req/song.similar.req.dto";
import { SongSongGenresParamReqDto } from "./dto/req/song.song.genres.param.req.dto";
import { SongSongGenresQueryReqDto } from "./dto/req/song.song.genres.query.req.dto";
import { SongTopDayReqDto } from "./dto/req/song.top-day.req.dto";
import { SongTopWeekReqDto } from "./dto/req/song.top-week.req.dto";
import { SongUnlikeReqDto } from "./dto/req/song.unlike.req.dto";

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
  constructor(private readonly songService: SongService) {}

  @ApiParam({
    name: "artistId",
    type: String,
  })
  @Get("artist/songs/:artistId/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async artistSongs(
    @Param() dto: SongArtistSongsReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.artistSongs(dto);
  }

  @ApiParam({
    name: "artistId",
    type: String,
  })
  @Get("artist/songs/top/:artistId/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async artistSongsTop(
    @Param() dto: SongArtistSongsTopReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.artistSongsTop(dto);
  }

  @ApiParam({
    name: "id",
    type: String,
  })
  @Get("byId/:id")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async byId(@Param() dto: SongByIdReqDto): Promise<DataSongResDto> {
    return this.songService.byId(dto);
  }

  @ApiParam({
    name: "orderBy",
    type: String,
  })
  @Get("genre/:orderBy/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async genre(
    @Param("orderBy", AppOrderByPipe) orderBy: DataOrderByType,
    @Param() paramDto: SongSongGenresParamReqDto,
    @Query() queryDto: SongSongGenresQueryReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.genre(orderBy, paramDto, queryDto);
  }

  @ApiParam({
    name: "orderBy",
    type: String,
  })
  @Get("language/:language/:orderBy/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async language(
    @Param("orderBy", AppOrderByPipe) orderBy: DataOrderByType,
    @Param() dto: SongLanguageReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.language(dto, orderBy);
  }

  @Post("like")
  @UseGuards(AuthGuard("jwt"))
  async like(
    @Body() dto: SongLikeReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataSongResDto> {
    return this.songService.like({ ...dto, sub });
  }

  @Get("liked/:from/:size")
  @UseGuards(AuthGuard("jwt"))
  async liked(
    @Param() dto: SongLikedReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.liked({ ...dto, sub });
  }

  @Get("mood/:mood/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async mood(
    @Param() dto: SongMoodReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.mood(dto);
  }

  @Get("new/podcast/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async newPodcast(
    @Param() dto: DataSongNewPodcastReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.newPodcast(dto);
  }

  @Get("new/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async newSong(
    @Param() dto: SongNewReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.newSong(dto);
  }

  @ApiParam({
    name: "orderBy",
    type: String,
  })
  @Get("podcast/genres/:orderBy/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async podcast(
    @Param("orderBy", AppOrderByPipe) orderBy: DataOrderByType,
    @Param() paramDto: SongPodcastGenresParamReqDto,
    @Query() queryDto: SongPodcastGenresQueryReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.podcast(orderBy, paramDto, queryDto);
  }

  @Post("send/telegram")
  @UseGuards(AuthGuard("jwt"))
  async sendTelegram(
    @Body() dto: SongSendTelegramReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<void> {
    return this.songService.sendTelegram({ ...dto, sub });
  }

  @ApiParam({
    name: "id",
    type: String,
  })
  @Get("similar/:id/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async similar(
    @Param() dto: SongSimilarReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.similar(dto);
  }

  @Get("slider")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async slider(): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.slider();
  }

  @Get("top/day/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async topDay(
    @Param() dto: SongTopDayReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.topDay(dto);
  }

  @Get("top/week/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async topWeek(
    @Param() dto: SongTopWeekReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.topWeek(dto);
  }

  @Post("unlike")
  @UseGuards(AuthGuard("jwt"))
  async unlike(
    @Body() dto: SongUnlikeReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataSongResDto> {
    return this.songService.unlike({ ...dto, sub });
  }
}
