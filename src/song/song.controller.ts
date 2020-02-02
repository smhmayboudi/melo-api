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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../decorator/user.decorator";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { OrderByPipe } from "../pipe/order-by.pipe";
import { SongByIdReqDto } from "./dto/req/song.by-id.req.dto";
import { SongSongGenresParamReqDto } from "./dto/req/song.song.genres.param.req.dto";
import { SongPaginationResDto } from "./dto/res/song.pagination.res.dto";
import { SongSongResDto } from "./dto/res/song.song.res.dto";
import { SongService } from "./song.service";
import { SongOrderByType } from "./type/song.order-by.type";
import { SongSongGenresQueryReqDto } from "./dto/req/song.song.genres.query.req.dto";
import { SongLanguageReqDto } from "./dto/req/song.language.req.dto";
import { SongLikeReqDto } from "./dto/req/song.like.req.dto";
import { SongLikedReqDto } from "./dto/req/song.liked.req.dto";
import { SongMoodReqDto } from "./dto/req/song.mood.req.dto";
import { SongNewReqDto } from "./dto/req/song.new.req.dto";
import { DataSongNewPodcastReqDto } from "../data/dto/req/data.song.new-podcast.req.dto";
import { SongPodcastGenresParamReqDto } from "./dto/req/song.podcast.genres.param.req.dto";
import { SongPodcastGenresQueryReqDto } from "./dto/req/song.podcast.genres.query.req.dto";
import { SongSendTelegramReqDto } from "./dto/req/song.send-telegram.req.dto";
import { SongSimilarReqDto } from "./dto/req/song.similar.req.dto";
import { SongTopDayReqDto } from "./dto/req/song.top-day.req.dto";
import { SongTopWeekReqDto } from "./dto/req/song.top-week.req.dto";
import { SongUnlikeReqDto } from "./dto/req/song.unlike.req.dto";
import { DataSongResDto } from "src/data/dto/res/data.song.res.dto";

@ApiBearerAuth("jwt")
@ApiTags("song")
@Controller("song")
@UseGuards(AuthGuard("jwt"))
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

  @Get(":id")
  async byId(
    @Param() dto: SongByIdReqDto,
    @Param("id", HashIdPipe) id: number
  ): Promise<SongSongResDto> {
    return this.songService.byId(dto, id);
  }

  @Get("genre/:orderBy/:from/:limit")
  async genre(
    @Param() paramDto: SongSongGenresParamReqDto,
    @Param("orderBy", OrderByPipe) orderBy: SongOrderByType,
    @Query() queryDto: SongSongGenresQueryReqDto
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return this.songService.genre(paramDto, orderBy, queryDto);
  }

  @Get("language/:language/:orderBy/:from/:limit")
  async language(
    @Param() dto: SongLanguageReqDto,
    @Param("orderBy", OrderByPipe) orderBy: SongOrderByType
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return this.songService.language(dto, orderBy);
  }

  @Post("like")
  async like(
    @Body() dto: SongLikeReqDto,
    @Body("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataSongResDto> {
    return this.songService.like(dto, id, sub);
  }

  @Get("liked/:from/:limit")
  async liked(
    @Param() dto: SongLikedReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return this.songService.liked(dto, sub);
  }

  @Get("mood/:mood/:from/:limit")
  async mood(
    @Param() dto: SongMoodReqDto
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return this.songService.mood(dto);
  }

  @Get("new/:from/:limit")
  async new(
    @Param() dto: SongNewReqDto
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return this.songService.new(dto);
  }

  @Get("new/podcast/:from/:limit")
  async newPodcast(
    @Param() dto: DataSongNewPodcastReqDto
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return this.songService.newPodcast(dto);
  }

  @Get("podcast/genres/:orderBy/:from/:limit")
  async podcast(
    @Param() paramDto: SongPodcastGenresParamReqDto,
    @Query() queryDto: SongPodcastGenresQueryReqDto,
    @Param("orderBy", OrderByPipe) orderBy: SongOrderByType
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return this.songService.podcast(paramDto, queryDto, orderBy);
  }

  @Post("send/telegram")
  async sendTelegram(
    @Body() dto: SongSendTelegramReqDto,
    @Body("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<number> {
    return this.songService.sendTelegram(dto, id, sub);
  }

  @Get("similar/:id/:from/:limit")
  async similar(
    @Param() dto: SongSimilarReqDto,
    @Param("id", HashIdPipe) id: number
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return this.songService.similar(dto, id);
  }

  @Get("slider/latest")
  async sliderLatest(
    @User("sub", ParseIntPipe) sub: number
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return this.songService.sliderLatest(sub);
  }

  @Get("top/day/:from/:limit")
  async topDay(
    @Param() dto: SongTopDayReqDto
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return this.songService.topDay(dto);
  }

  @Get("top/week/:from/:limit")
  async topWeek(
    @Param() dto: SongTopWeekReqDto
  ): Promise<SongPaginationResDto<SongSongResDto>> {
    return this.songService.topWeek(dto);
  }

  @Post("unlike")
  async unlike(
    @Body() dto: SongUnlikeReqDto,
    @Body("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataSongResDto> {
    return this.songService.unlike(dto, id, sub);
  }
}
