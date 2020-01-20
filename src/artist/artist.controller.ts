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
  Post,
  Body
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { ArtistService } from "./artist.service";
import { AuthGuard } from "@nestjs/passport";
import { ArtistFollowDto } from "./dto/artist.follow.dto";

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
    @Param("id") id: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.artistService.albums({
      id: id,
      from,
      limit
    });
  }

  @Get("byId/:id")
  async byId(@Param("id") id: string): Promise<any> {
    return this.artistService.byId({
      id
    });
  }

  @Post("follow")
  async follow(@Body() dto: ArtistFollowDto): Promise<any> {
    return this.artistService.follow(dto);
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

  @Get("songs/:id/:from/:limit")
  async songs(
    @Param("id") id: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.artistService.songs({
      id,
      from,
      limit
    });
  }

  @Get("songs/top/:id/:from/:limit")
  async songsTop(
    @Param("id") id: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.artistService.songsTop({
      id,
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
  async unfollow(@Param("id") id: string): Promise<any> {
    return this.artistService.unfollow({
      id
    });
  }
}
