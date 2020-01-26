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
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { AlbumDto } from "../data/dto/album.dto";
import { ArtistDto } from "../data/dto/artist.dto";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { SongDto } from "../data/dto/song.dto";
import { User } from "../decorator/user.decorator";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { ArtistService } from "./artist.service";
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

  @ApiParam({
    name: "id",
    type: "string"
  })
  @Get("albums/:id/:from/:limit")
  async albums(
    @Param("id", HashIdPipe) id: number,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<AlbumDto>> {
    return this.artistService.albums({
      id,
      from,
      limit
    });
  }

  @ApiParam({
    name: "id",
    type: "string"
  })
  @Get("byId/:id")
  async byId(@Param("id", HashIdPipe) id: number): Promise<ArtistDto> {
    return this.artistService.byId({
      artistId: id
    });
  }

  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string"
        }
      }
    }
  })
  @Post("follow")
  // TODO: convert hash to number HashIdPipe
  async follow(
    @Body() dto: ArtistFollowDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<boolean> {
    return this.artistService.follow(dto, sub);
  }

  @Get("following/:from/:limit")
  async following(
    @Param("from") from: number,
    @Param("limit") limit: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<PaginationResultDto<ArtistDto>> {
    return this.artistService.following(
      {
        from,
        limit
      },
      sub
    );
  }

  @Get("songs/:id/:from/:limit")
  async songs(
    @Param("id", HashIdPipe) id: number,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<SongDto>> {
    return this.artistService.songs({
      id,
      from,
      limit
    });
  }

  @Get("songs/top/:id/:from/:limit")
  async songsTop(
    @Param("id", HashIdPipe) id: number,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<SongDto>> {
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
  ): Promise<PaginationResultDto<ArtistDto>> {
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
  ): Promise<PaginationResultDto<ArtistDto>> {
    return this.artistService.trendingGenre({
      from,
      genre,
      limit
    });
  }

  @Post("unfollow")
  async unfollow(
    @Param("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<boolean> {
    return this.artistService.unfollow(
      {
        id
      },
      sub
    );
  }
}
