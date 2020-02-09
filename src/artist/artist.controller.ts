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
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
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

  @Post("follow")
  @UseGuards(AuthGuard("jwt"))
  async follow(
    @Body() dto: ArtistFollowReqDto,
    @Body("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataArtistResDto> {
    return this.artistService.follow(dto, id, sub);
  }

  @Get("following/:from/:limit")
  @UseGuards(AuthGuard("jwt"))
  async following(
    @Param() dto: ArtistFollowingReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.artistService.following(dto, sub);
  }

  @ApiParam({
    name: "id",
    type: String
  })
  @Get("profile/:id")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async profile(
    @Param() dto: ArtistByIdReqDto,
    @Param("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataArtistResDto> {
    return this.artistService.profile(dto, id, sub);
  }

  @Get("trending")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async trending(
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.artistService.trending(sub);
  }

  @Get("trending/genre/:genre")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async trendingGenre(
    @Param() dto: ArtistTrendingGenreReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.artistService.trendingGenre(dto, sub);
  }

  @Post("unfollow")
  @UseGuards(AuthGuard("jwt"))
  async unfollow(
    @Body() dto: ArtistUnfollowReqDto,
    @Body("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataArtistResDto> {
    return this.artistService.unfollow(dto, id, sub);
  }
}
