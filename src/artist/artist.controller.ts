import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Post
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { ArtistService } from "./artist.service";
import { AuthGuard } from "@nestjs/passport";

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

  @Get("albums/:artistId/:from/:limit")
  async albums(
    @Param("artistId") artistId: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.artistService.albums({
      artistId,
      from,
      limit
    });
  }

  @Get("byId/:artistId")
  async byId(@Param("artistId") artistId: string): Promise<any> {
    return this.artistService.byId({
      artistId
    });
  }

  @Post("follow")
  async follow(@Param("artistId") artistId: string): Promise<any> {
    return this.artistService.follow({
      artistId
    });
  }

  @Get("following/:from/:limit")
  async following(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.artistService.following({
      from,
      limit
    });
  }

  @Get("songs/:artistId/:from/:limit")
  async songs(
    @Param("artistId") artistId: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.artistService.songs({
      artistId,
      from,
      limit
    });
  }

  @Get("songs/top/:artistId/:from/:limit")
  async songsTop(
    @Param("artistId") artistId: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.artistService.songsTop({
      artistId,
      from,
      limit
    });
  }

  @Get("trending/:from/:limit")
  async trending(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.artistService.trending({
      from,
      limit
    });
  }

  @Get("trending/genre/:genre/:from/:limit")
  async trendingGenre(
    @Param("genre") genre: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.artistService.trendingGenre({
      genre,
      from,
      limit
    });
  }

  @Post("unfollow")
  async unfollow(@Param("artistId") artistId: string): Promise<any> {
    return this.artistService.unfollow({
      artistId
    });
  }
}
