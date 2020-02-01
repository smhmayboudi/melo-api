import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ArtistAlbumResDto } from "./dto/res/artist.album.res.dto";
import { ArtistAlbumsReqDto } from "./dto/req/artist.albums.req.dto";
import { ArtistArtistResDto } from "./dto/res/artist.artist.res.dto";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistPaginationResDto } from "./dto/res/artist.pagination.res.dto";
import { ArtistService } from "./artist.service";
import { ArtistSongResDto } from "./dto/res/artist.song.res.dto";
import { ArtistSongsReqDto } from "./dto/req/artist.songs.req.dto";
import { ArtistSongsTopReqDto } from "./dto/req/artist.songs-top.req.dto";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";
import { AuthGuard } from "@nestjs/passport";
import { DataArtistResDto } from "src/data/dto/res/data.artist.res.dto";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { User } from "../decorator/user.decorator";

@ApiBearerAuth("jwt")
@ApiTags("artist")
@Controller("artist")
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
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get("albums/:id/:from/:limit")
  async albums(
    @Param() dto: ArtistAlbumsReqDto,
    @Param("id", HashIdPipe) id: number
  ): Promise<ArtistPaginationResDto<ArtistAlbumResDto>> {
    return this.artistService.albums(dto, id);
  }

  @Get("byId/:id")
  async byId(
    @Param() dto: ArtistByIdReqDto,
    @Param("id", HashIdPipe) id: number
  ): Promise<ArtistArtistResDto> {
    return this.artistService.byId(dto, id);
  }

  @Post("follow")
  async follow(
    @Body() dto: ArtistFollowReqDto,
    @Body("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataArtistResDto> {
    return this.artistService.follow(dto, id, sub);
  }

  @Get("following/:from/:limit")
  async following(
    @Param() dto: ArtistFollowingReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<ArtistPaginationResDto<ArtistArtistResDto>> {
    return this.artistService.following(dto, sub);
  }

  @Get("songs/:id/:from/:limit")
  async songs(
    @Param() dto: ArtistSongsReqDto,
    @Param("id", HashIdPipe) id: number
  ): Promise<ArtistPaginationResDto<ArtistSongResDto>> {
    return this.artistService.songs(dto, id);
  }

  @Get("songs/top/:id/:from/:limit")
  async songsTop(
    @Param() dto: ArtistSongsTopReqDto,
    @Param("id", HashIdPipe) id: number
  ): Promise<ArtistPaginationResDto<ArtistSongResDto>> {
    return this.artistService.songsTop(dto, id);
  }

  @Get("trending")
  async trending(): Promise<ArtistPaginationResDto<ArtistArtistResDto>> {
    return this.artistService.trending();
  }

  @Get("trending/genre/:genre")
  async trendingGenre(
    @Param() dto: ArtistTrendingGenreReqDto
  ): Promise<ArtistPaginationResDto<ArtistArtistResDto>> {
    return this.artistService.trendingGenre(dto);
  }

  @Post("unfollow")
  async unfollow(
    @Body() dto: ArtistUnfollowReqDto,
    @Body("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataArtistResDto> {
    return this.artistService.unfollow(dto, id, sub);
  }
}
