import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { User } from "../decorator/user.decorator";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { ArtistService } from "./artist.service";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";

@ApiBearerAuth("jwt")
@ApiTags("artist")
@Controller("artist")
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

  @Get("byId/:id")
  async byId(
    @Param() dto: ArtistByIdReqDto,
    @Param("id", HashIdPipe) id: number
  ): Promise<DataArtistResDto> {
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
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.artistService.following(dto, sub);
  }

  @Get("trending")
  async trending(): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.artistService.trending();
  }

  @Get("trending/genre/:genre")
  async trendingGenre(
    @Param() dto: ArtistTrendingGenreReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
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
