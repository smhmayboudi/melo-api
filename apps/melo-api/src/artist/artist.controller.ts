import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
} from "@melo/common";
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

import { AppUser } from "../app/app.user.decorator";
import { ArtistFollowInterceptor } from "./artist.follow.interceptor";
import { ArtistHashIdInterceptor } from "./artist.hash-id.interceptor";
import { ArtistLikeInterceptor } from "./artist.like.interceptor";
import { ArtistLocalizeInterceptor } from "./artist.localize.interceptor";
import { ArtistService } from "./artist.service";
import { AuthGuard } from "@nestjs/passport";

@UseInterceptors(
  ArtistFollowInterceptor,
  ArtistLikeInterceptor,
  ArtistLocalizeInterceptor,
  ArtistHashIdInterceptor
)
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
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<ArtistResDto> {
    return this.artistService.follow({
      ...dto,
      sub,
    });
  }

  @Get("following/:from/:size")
  @UseGuards(AuthGuard("jwt"))
  async following(
    @Param() dto: ArtistFollowingReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<ArtistResDto[]> {
    return this.artistService.following({
      ...dto,
      sub,
    });
  }

  @ApiParam({
    name: "id",
    type: String,
  })
  @Get("profile/:id")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async profile(@Param() dto: ArtistGetReqDto): Promise<ArtistResDto> {
    return this.artistService.profile(dto);
  }

  @Get("trending")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async trending(dto: ArtistTrendingReqDto): Promise<ArtistResDto[]> {
    return this.artistService.trending(dto);
  }

  @Get("trending/genre/:genre")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async trendingGenre(
    @Param() dto: ArtistTrendingGenreReqDto
  ): Promise<ArtistResDto[]> {
    return this.artistService.trendingGenre(dto);
  }

  @Post("unfollow")
  @UseGuards(AuthGuard("jwt"))
  async unfollow(
    @Body() dto: ArtistUnfollowReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<ArtistResDto> {
    return this.artistService.unfollow({
      ...dto,
      sub,
    });
  }
}
