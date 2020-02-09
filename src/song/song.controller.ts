import {
  Body,
  ClassSerializerInterceptor,
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
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { DataSongNewPodcastReqDto } from "../data/dto/req/data.song.new-podcast.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { DataOrderByType } from "../data/type/data.order-by.type";
import { User } from "../decorator/user.decorator";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { OrderByPipe } from "../pipe/order-by.pipe";
import { SongArtistSongsTopReqDto } from "./dto/req/song.artist-songs-top.req.dto";
import { SongArtistSongsReqDto } from "./dto/req/song.artist-songs.req.dto";
import { SongByIdReqDto } from "./dto/req/song.by-id.req.dto";
import { SongLanguageReqDto } from "./dto/req/song.language.req.dto";
import { SongLikeReqDto } from "./dto/req/song.like.req.dto";
import { SongLikedReqDto } from "./dto/req/song.liked.req.dto";
import { SongMoodReqDto } from "./dto/req/song.mood.req.dto";
import { SongNewReqDto } from "./dto/req/song.new.req.dto";
import { SongPodcastGenresParamReqDto } from "./dto/req/song.podcast.genres.param.req.dto";
import { SongPodcastGenresQueryReqDto } from "./dto/req/song.podcast.genres.query.req.dto";
import { SongSearchMoodParamDto } from "./dto/req/song.search-mood.param.req.dto";
import { SongSearchMoodQueryDto } from "./dto/req/song.search-mood.query.req.dto";
import { SongSendTelegramReqDto } from "./dto/req/song.send-telegram.req.dto";
import { SongSimilarReqDto } from "./dto/req/song.similar.req.dto";
import { SongSongGenresParamReqDto } from "./dto/req/song.song.genres.param.req.dto";
import { SongSongGenresQueryReqDto } from "./dto/req/song.song.genres.query.req.dto";
import { SongTopDayReqDto } from "./dto/req/song.top-day.req.dto";
import { SongTopWeekReqDto } from "./dto/req/song.top-week.req.dto";
import { SongUnlikeReqDto } from "./dto/req/song.unlike.req.dto";
import { SongService } from "./song.service";

@ApiBearerAuth("jwt")
@ApiTags("song")
@Controller("song")
@UseInterceptors(ClassSerializerInterceptor, ErrorInterceptor)
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
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async artistSongs(
    @Param() dto: SongArtistSongsReqDto,
    @Param("artistId", HashIdPipe) artistId: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.artistSongs(dto, artistId, sub);
  }

  @ApiParam({
    name: "artistId",
    type: String
  })
  @Get("artist/songs/top/:artistId/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async artistSongsTop(
    @Param() dto: SongArtistSongsTopReqDto,
    @Param("artistId", HashIdPipe) artistId: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.artistSongsTop(dto, artistId, sub);
  }

  @ApiParam({
    name: "id",
    type: String
  })
  @Get("byId/:id")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async byId(
    @Param() dto: SongByIdReqDto,
    @Param("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataSongResDto> {
    return this.songService.byId(dto, id, sub);
  }

  @Get("genre/:orderBy/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async genre(
    @Param("orderBy", OrderByPipe) orderBy: DataOrderByType,
    @Param() paramDto: SongSongGenresParamReqDto,
    @Query() queryDto: SongSongGenresQueryReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.genre(paramDto, orderBy, queryDto, sub);
  }

  @Get("language/:language/:orderBy/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async language(
    @Param("orderBy", OrderByPipe) orderBy: DataOrderByType,
    @Param() dto: SongLanguageReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.language(dto, orderBy, sub);
  }

  @ApiParam({
    name: "id",
    type: String
  })
  @Post("like")
  @UseGuards(AuthGuard("jwt"))
  async like(
    @Body() dto: SongLikeReqDto,
    @Body("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataSongResDto> {
    return this.songService.like(dto, id, sub);
  }

  @Get("liked/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async liked(
    @Param() dto: SongLikedReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.liked(dto, sub);
  }

  @Get("mood/:mood/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async mood(
    @Param() dto: SongMoodReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.mood(dto, sub);
  }

  @Get("new/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async new(
    @Param() dto: SongNewReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.new(dto, sub);
  }

  @Get("new/podcast/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async newPodcast(
    @Param() dto: DataSongNewPodcastReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.newPodcast(dto, sub);
  }

  @Get("podcast/genres/:orderBy/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async podcast(
    @Param("orderBy", OrderByPipe) orderBy: DataOrderByType,
    @Param() paramDto: SongPodcastGenresParamReqDto,
    @Query() queryDto: SongPodcastGenresQueryReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.podcast(paramDto, queryDto, orderBy, sub);
  }

  @Get("search/mood/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async searchMood(
    @Param() paramDto: SongSearchMoodParamDto,
    @Query() querydto: SongSearchMoodQueryDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.searchMood(paramDto, querydto);
  }

  @ApiParam({
    name: "id",
    type: String
  })
  @Post("send/telegram")
  @UseGuards(AuthGuard("jwt"))
  async sendTelegram(
    @Body() dto: SongSendTelegramReqDto,
    @Body("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<void> {
    return this.songService.sendTelegram(dto, id, sub);
  }

  @ApiParam({
    name: "id",
    type: String
  })
  @Get("similar/:id/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async similar(
    @Param() dto: SongSimilarReqDto,
    @Param("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.similar(dto, id, sub);
  }

  @Get("slider")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async slider(
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.slider(sub);
  }

  @Get("top/day/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async topDay(
    @Param() dto: SongTopDayReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.topDay(dto, sub);
  }

  @Get("top/week/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async topWeek(
    @Param() dto: SongTopWeekReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.songService.topWeek(dto, sub);
  }

  @ApiParam({
    name: "id",
    type: String
  })
  @Post("unlike")
  @UseGuards(AuthGuard("jwt"))
  async unlike(
    @Body() dto: SongUnlikeReqDto,
    @Body("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataSongResDto> {
    return this.songService.unlike(dto, id, sub);
  }
}
