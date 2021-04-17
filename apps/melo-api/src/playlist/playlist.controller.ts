import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  PlaylistAddSongReqDto,
  PlaylistCreateReqDto,
  PlaylistDeleteReqDto,
  PlaylistEditReqDto,
  PlaylistGetReqDto,
  PlaylistMyReqDto,
  PlaylistRemoveSongReqDto,
  PlaylistResDto,
  PlaylistTopReqDto,
} from "@melo/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { PlaylistHashIdInterceptor } from "./playlist.hash-id.interceptor";
import { PlaylistLikeInterceptor } from "./playlist.like.interceptor";
import { PlaylistLocalizeInterceptor } from "./playlist.localize.interceptor";
import { PlaylistService } from "./playlist.service";

@UseInterceptors(
  PlaylistLikeInterceptor,
  PlaylistLocalizeInterceptor,
  PlaylistHashIdInterceptor
)
@ApiBearerAuth("jwt")
@ApiTags("playlist")
@Controller("playlist")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @ApiParam({
    name: "songId",
    type: String,
  })
  @Post("addSong")
  @UseGuards(AuthGuard("jwt"))
  async addSong(@Body() dto: PlaylistAddSongReqDto): Promise<PlaylistResDto> {
    return this.playlistService.addSong(dto);
  }

  @Post("create")
  @UseGuards(AuthGuard("jwt"))
  async create(
    @Body() dto: PlaylistCreateReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<PlaylistResDto> {
    return this.playlistService.create({
      ...dto,
      sub,
    });
  }

  @Delete("byId/:id")
  @UseGuards(AuthGuard("jwt"))
  async delete(
    @Param() dto: PlaylistDeleteReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<PlaylistResDto> {
    return this.playlistService.delete({
      ...dto,
      sub,
    });
  }

  @Post("edit")
  @UseGuards(AuthGuard("jwt"))
  async edit(@Body() dto: PlaylistEditReqDto): Promise<PlaylistResDto> {
    return this.playlistService.edit(dto);
  }

  @Get("byId/:id")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async get(@Param() dto: PlaylistGetReqDto): Promise<PlaylistResDto> {
    return this.playlistService.get(dto);
  }

  @Get("my/:from/:size")
  @UseGuards(AuthGuard("jwt"))
  async my(
    @Param() dto: PlaylistMyReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<PlaylistResDto[]> {
    return this.playlistService.my({
      ...dto,

      sub,
    });
  }

  @ApiParam({
    name: "songId",
    type: String,
  })
  @Delete("song/:playlistId/:songId")
  @UseGuards(AuthGuard("jwt"))
  async removeSong(
    @Param() dto: PlaylistRemoveSongReqDto
  ): Promise<PlaylistResDto> {
    return this.playlistService.removeSong(dto);
  }

  @Get("top/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async top(@Param() dto: PlaylistTopReqDto): Promise<PlaylistResDto[]> {
    return this.playlistService.top(dto);
  }
}
