import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { SongService } from "./song.service";
import { AuthGuard } from "@nestjs/passport";
import { SongLikeDto } from "./dto/song.like.dto";
import { SongUnlikeDto } from "./dto/song.unlike.dto";

@ApiBearerAuth("jwt")
@ApiTags("song")
@Controller("song")
@UseFilters(HttpExceptionFilter)
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

  @Get("genre/:orderBy/:from/:limit")
  async genre(
    @Param("orderBy") orderBy: string,
    @Param("from") from: number,
    @Param("limit") limit: number,
    @Query("genres") genres: string[]
  ): Promise<any> {
    return this.songService.genre({
      from,
      genres,
      limit,
      orderBy
    });
  }

  @Get(":id")
  async get(@Param("id") id: string): Promise<any> {
    return this.songService.get({
      id
    });
  }

  @Get("language/:language/:orderBy/:from/:limit")
  async language(
    @Param("language") language: string,
    @Param("orderBy") orderBy: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.songService.language({
      from,
      language,
      limit,
      orderBy
    });
  }

  @Post()
  async like(@Body() dto: SongLikeDto): Promise<any> {
    return this.songService.like(dto);
  }

  @Get("liked/:from/:limit")
  async liked(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.songService.liked({
      from,
      limit
    });
  }

  @Get("mood/:mood/:from/:limit")
  async mood(
    @Param("mood") mood: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.songService.mood({
      from,
      limit,
      mood
    });
  }

  @Get("new/:from/:limit")
  async new(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.songService.new({
      from,
      limit
    });
  }

  @Get("new/podcast/:from/:limit")
  async newPodcast(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.songService.newPodcast({
      limit,
      from
    });
  }

  @Get("podcast/genres/:orderBy/:from/:limit")
  async podcastGenres(
    @Param("orderBy") orderBy: string,
    @Param("from") from: number,
    @Param("limit") limit: number,
    @Query("genres") genres: string[]
  ): Promise<any> {
    return this.songService.podcastGenres({
      from,
      genres,
      limit,
      orderBy
    });
  }

  @Get("similar/:songId/:from/:limit")
  async similar(
    @Param("songId") songId: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.songService.similar({
      songId,
      from,
      limit
    });
  }

  @Get("slider/latest")
  async sliderLatest(): Promise<any> {
    return this.songService.sliderLatest({});
  }

  @Get("top/day/:from/:limit")
  async topDay(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.songService.topDay({
      from,
      limit
    });
  }

  @Get("top/week/:from/:limit")
  async topWeek(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.songService.topWeek({
      from,
      limit
    });
  }

  @Post()
  async unlike(@Body() dto: SongUnlikeDto): Promise<any> {
    return this.songService.unlike(dto);
  }
}
