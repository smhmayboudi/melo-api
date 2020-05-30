import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  ArtistConfigReqDto,
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
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
import { ArtistConfigService } from "./artist.config.service";
import { ArtistFollowInterceptor } from "./artist.follow.interceptor";
import { ArtistHashIdInterceptor } from "./artist.hash-id.interceptor";
import { ArtistLikeInterceptor } from "./artist.like.interceptor";
import { ArtistLocalizeInterceptor } from "./artist.localize.interceptor";
import { ArtistService } from "./artist.service";
import { AuthGuard } from "@nestjs/passport";
import { DataConfigService } from "../data/data.config.service";

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
  private config: ArtistConfigReqDto = {
    maxSize: this.artistConfigService.maxSize,
  };
  private dataConfigElasticsearch: DataConfigElasticsearchReqDto = {
    imagePath: this.dataConfigService.imagePath,
    imagePathDefaultAlbum: this.dataConfigService.imagePathDefaultAlbum,
    imagePathDefaultArtist: this.dataConfigService.imagePathDefaultArtist,
    imagePathDefaultSong: this.dataConfigService.imagePathDefaultSong,
    indexName: this.dataConfigService.indexName,
    maxSize: this.dataConfigService.maxSize,
    mp3Endpoint: this.dataConfigService.mp3Endpoint,
  };
  private dataConfigImage: DataConfigImageReqDto = {
    imageBaseUrl: this.dataConfigService.imageBaseUrl,
    imageEncode: this.dataConfigService.imageEncode,
    imageKey: this.dataConfigService.imageKey,
    imageSalt: this.dataConfigService.imageSalt,
    imageSignatureSize: this.dataConfigService.imageSignatureSize,
    imageTypeSize: this.dataConfigService.imageTypeSize,
  };

  constructor(
    private readonly artistConfigService: ArtistConfigService,
    private readonly artistService: ArtistService,
    private readonly dataConfigService: DataConfigService
  ) {}

  @Post("follow")
  @UseGuards(AuthGuard("jwt"))
  async follow(
    @Body() dto: ArtistFollowReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<ArtistResDto> {
    return this.artistService.follow({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
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
      config: this.config,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
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
    return this.artistService.profile({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Get("trending")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async trending(dto: ArtistTrendingReqDto): Promise<ArtistResDto[]> {
    return this.artistService.trending({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Get("trending/genre/:genre")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async trendingGenre(
    @Param() dto: ArtistTrendingGenreReqDto
  ): Promise<ArtistResDto[]> {
    return this.artistService.trendingGenre({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Post("unfollow")
  @UseGuards(AuthGuard("jwt"))
  async unfollow(
    @Body() dto: ArtistUnfollowReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<ArtistResDto> {
    return this.artistService.unfollow({
      ...dto,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
      sub,
    });
  }
}
