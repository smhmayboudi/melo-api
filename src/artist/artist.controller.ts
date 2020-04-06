import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AppHashIdPipe } from "../app/app.hash-id.pipe";
import { AppUser } from "../app/app.user.decorator";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowInterceptor } from "./artist.follow.interceptor";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistLikeInterceptor } from "./artist.like.interceptor";
import { ArtistLocalizeInterceptor } from "./artist.localize.interceptor";
import { ArtistService } from "./artist.service";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";
import { AuthGuard } from "@nestjs/passport";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";

@UseInterceptors(ArtistLocalizeInterceptor)
@UseInterceptors(ArtistLikeInterceptor)
@UseInterceptors(ArtistFollowInterceptor)
@ApiBearerAuth("jwt")
@ApiTags("artist")
@Controller("artist")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post("follow")
  @UseGuards(AuthGuard("jwt"))
  async follow(
    @Body() dto: ArtistFollowReqDto,
    @Body("id", AppHashIdPipe) id: number,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataArtistResDto> {
    return this.artistService.follow(dto, id, sub);
  }

  @Get("following/:from/:limit")
  @UseGuards(AuthGuard("jwt"))
  async following(
    @Param() dto: ArtistFollowingReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.artistService.following(dto, sub);
  }

  @ApiParam({
    name: "id",
    type: String,
  })
  @Get("profile/:id")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async profile(
    @Param() dto: ArtistByIdReqDto,
    @Param("id", AppHashIdPipe) id: number
  ): Promise<DataArtistResDto> {
    return this.artistService.profile(dto, id);
  }

  @Get("trending")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async trending(): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.artistService.trending();
  }

  @Get("trending/genre/:genre")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async trendingGenre(
    @Param() dto: ArtistTrendingGenreReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.artistService.trendingGenre(dto);
  }

  @Post("unfollow")
  @UseGuards(AuthGuard("jwt"))
  async unfollow(
    @Body() dto: ArtistUnfollowReqDto,
    @Body("id", AppHashIdPipe) id: number,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataArtistResDto> {
    return this.artistService.unfollow(dto, id, sub);
  }
}
