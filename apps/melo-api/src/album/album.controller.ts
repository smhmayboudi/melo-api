import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
} from "@melo/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AlbumFollowInterceptor } from "./album.follow.interceptor";
import { AlbumHashIdInterceptor } from "./album.hash-id.interceptor";
import { AlbumLikeInterceptor } from "./album.like.interceptor";
import { AlbumLocalizeInterceptor } from "./album.localize.interceptor";
import { AlbumService } from "./album.service";
import { AuthGuard } from "@nestjs/passport";

@UseInterceptors(
  AlbumFollowInterceptor,
  AlbumLikeInterceptor,
  AlbumLocalizeInterceptor,
  AlbumHashIdInterceptor
)
@ApiBearerAuth("jwt")
@ApiTags("album")
@Controller("album")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiParam({
    example: "abcdef",
    name: "id",
    type: String,
  })
  @Get("artist/albums/:id/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async albums(@Param() dto: AlbumArtistsReqDto): Promise<AlbumResDto[]> {
    return this.albumService.albums(dto);
  }

  @ApiParam({
    name: "id",
    type: String,
  })
  @Get("byId/:id")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async get(@Param() dto: AlbumGetReqDto): Promise<AlbumResDto> {
    return this.albumService.get(dto);
  }

  @Get("latest/:language/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async latest(@Param() dto: AlbumLatestReqDto): Promise<AlbumResDto[]> {
    return this.albumService.latest(dto);
  }
}
