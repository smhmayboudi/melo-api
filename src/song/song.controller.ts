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
  ValidationPipe
} from "@nestjs/common";

import { AppHashIdPipe } from "../app/app.hash-id.pipe";
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
import { SongLanguageReqDto } from "./dto/req/song.language.req.dto";
import { SongLikeReqDto } from "./dto/req/song.like.req.dto";
import { SongLikedReqDto } from "./dto/req/song.liked.req.dto";
import { SongLocalizeInterceptor } from "./song.localize.interceptor";
import { SongMoodReqDto } from "./dto/req/song.mood.req.dto";
import { SongNewReqDto } from "./dto/req/song.new.req.dto";
import { SongPodcastGenresParamReqDto } from "./dto/req/song.podcast.genres.param.req.dto";
import { SongPodcastGenresQueryReqDto } from "./dto/req/song.podcast.genres.query.req.dto";
import { SongSearchMoodParamDto } from "./dto/req/song.search-mood.param.req.dto";
import { SongSearchMoodQueryDto } from "./dto/req/song.search-mood.query.req.dto";
import { SongSendTelegramReqDto } from "./dto/req/song.send-telegram.req.dto";
import { SongService } from "./song.service";
import { SongSimilarReqDto } from "./dto/req/song.similar.req.dto";
import { SongSongGenresParamReqDto } from "./dto/req/song.song.genres.param.req.dto";
import { SongSongGenresQueryReqDto } from "./dto/req/song.song.genres.query.req.dto";
import { SongTopDayReqDto } from "./dto/req/song.top-day.req.dto";
import { SongTopWeekReqDto } from "./dto/req/song.top-week.req.dto";
import { SongUnlikeReqDto } from "./dto/req/song.unlike.req.dto";

@UseInterceptors(new SongLocalizeInterceptor())
@ApiBearerAuth("jwt")
@ApiTags("song")
@Controller("song")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class SongController {
  constructor(private readonly songService: SongService) {}

  @ApiParam({
    name: "artistId",
    type: String
  })
  @Get("artist/songs/:artistId/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async artistSongs(
    @Param() dto: SongArtistSongsReqDto,
    @Param("artistId", AppHashIdPipe) artistId: number,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.artistSongs(dto, artistId, sub);
  }

  @ApiParam({
    name: "artistId",
    type: String
  })
  @Get("artist/songs/top/:artistId/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async artistSongsTop(
    @Param() dto: SongArtistSongsTopReqDto,
    @Param("artistId", AppHashIdPipe) artistId: number,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.artistSongsTop(dto, artistId, sub);
  }

  @ApiParam({
    name: "id",
    type: String
  })
  @Get("byId/:id")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async byId(
    @Param() dto: SongByIdReqDto,
    @Param("id", AppHashIdPipe) id: number,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataSongResDto> {
    return this.songService.byId(dto, id, sub);
  }

  @ApiParam({
    name: "orderBy",
    type: String
  })
  @Get("genre/:orderBy/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async genre(
    @Param("orderBy", AppOrderByPipe) orderBy: DataOrderByType,
    @Param() paramDto: SongSongGenresParamReqDto,
    @Query() queryDto: SongSongGenresQueryReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.genre(orderBy, paramDto, queryDto, sub);
  }

  @ApiParam({
    name: "orderBy",
    type: String
  })
  @Get("language/:language/:orderBy/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async language(
    @Param("orderBy", AppOrderByPipe) orderBy: DataOrderByType,
    @Param() dto: SongLanguageReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.language(dto, orderBy, sub);
  }

  @Post("like")
  @UseGuards(AuthGuard("jwt"))
  async like(
    @Body() dto: SongLikeReqDto,
    @Body("id", AppHashIdPipe) id: number,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataSongResDto> {
    return this.songService.like(dto, id, sub);
  }

  @Get("liked/:from/:limit")
  @UseGuards(AuthGuard("jwt"))
  async liked(
    @Param() dto: SongLikedReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.liked(dto, sub);
  }

  @Get("mood/:mood/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async mood(
    @Param() dto: SongMoodReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.mood(dto, sub);
  }

  @Get("new/podcast/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async newPodcast(
    @Param() dto: DataSongNewPodcastReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.newPodcast(dto, sub);
  }

  @Get("new/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async newSong(
    @Param() dto: SongNewReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.newSong(dto, sub);
  }

  @ApiParam({
    name: "orderBy",
    type: String
  })
  @Get("podcast/genres/:orderBy/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async podcast(
    @Param("orderBy", AppOrderByPipe) orderBy: DataOrderByType,
    @Param() paramDto: SongPodcastGenresParamReqDto,
    @Query() queryDto: SongPodcastGenresQueryReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.podcast(orderBy, paramDto, queryDto, sub);
  }

  @Get("search/mood/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async searchMood(
    @Param() paramDto: SongSearchMoodParamDto,
    @Query() querydto: SongSearchMoodQueryDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.searchMood(paramDto, querydto);
  }

  @Post("send/telegram")
  @UseGuards(AuthGuard("jwt"))
  async sendTelegram(
    @Body() dto: SongSendTelegramReqDto,
    @Body("id", AppHashIdPipe) id: number,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<void> {
    return this.songService.sendTelegram(dto, id, sub);
  }

  @ApiParam({
    name: "id",
    type: String
  })
  @Get("similar/:id/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async similar(
    @Param() dto: SongSimilarReqDto,
    @Param("id", AppHashIdPipe) id: number,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.similar(dto, id, sub);
  }

  @Get("slider")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async slider(
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.slider(sub);
  }

  @Get("top/day/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async topDay(
    @Param() dto: SongTopDayReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.topDay(dto, sub);
  }

  @Get("top/week/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async topWeek(
    @Param() dto: SongTopWeekReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.topWeek(dto, sub);
  }

  @Post("unlike")
  @UseGuards(AuthGuard("jwt"))
  async unlike(
    @Body() dto: SongUnlikeReqDto,
    @Body("id", AppHashIdPipe) id: number,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataSongResDto> {
    return this.songService.unlike(dto, id, sub);
  }
}
