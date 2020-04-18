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
import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { PlaylistAddSongReqDto } from "./dto/req/playlist.add-song.req.dto";
import { PlaylistCreateReqDto } from "./dto/req/playlist.create.req.dto";
import { PlaylistDeleteReqDto } from "./dto/req/playlist.delete.req.dto";
import { PlaylistEditReqDto } from "./dto/req/playlist.edit.req.dto";
import { PlaylistGetReqDto } from "./dto/req/playlist.get.req.dto";
import { PlaylistHashIdInterceptor } from "./playlist.hash-id.interceptor";
import { PlaylistLikeInterceptor } from "./playlist.like.interceptor";
import { PlaylistLocalizeInterceptor } from "./playlist.localize.interceptor";
import { PlaylistMyReqDto } from "./dto/req/playlist.my.req.dto";
import { PlaylistService } from "./playlist.service";
import { PlaylistSongReqDto } from "./dto/req/playlist.song.req.dto";
import { PlaylistTopReqDto } from "./dto/req/playlist.top.req.dto";

@UseInterceptors(PlaylistLikeInterceptor)
@UseInterceptors(PlaylistLocalizeInterceptor)
@UseInterceptors(PlaylistHashIdInterceptor)
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
  async addSong(
    @Body() dto: PlaylistAddSongReqDto
  ): Promise<DataPlaylistResDto> {
    return this.playlistService.addSong(dto);
  }

  @Post("create")
  @UseGuards(AuthGuard("jwt"))
  async create(
    @Body() dto: PlaylistCreateReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPlaylistResDto> {
    return this.playlistService.create(dto, sub);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async delete(
    @Param() dto: PlaylistDeleteReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPlaylistResDto> {
    return this.playlistService.delete(dto, sub);
  }

  @ApiParam({
    name: "songId",
    type: String,
  })
  @Delete("song/:playlistId/:songId")
  @UseGuards(AuthGuard("jwt"))
  async deleteSong(
    @Param() dto: PlaylistSongReqDto
  ): Promise<DataPlaylistResDto> {
    return this.playlistService.deleteSong(dto);
  }

  @Post("edit")
  @UseGuards(AuthGuard("jwt"))
  async edit(@Body() dto: PlaylistEditReqDto): Promise<DataPlaylistResDto> {
    return this.playlistService.edit(dto);
  }

  @Get(":id")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async get(@Param() dto: PlaylistGetReqDto): Promise<DataPlaylistResDto> {
    return this.playlistService.get(dto);
  }

  @Get("my/:from/:limit")
  @UseGuards(AuthGuard("jwt"))
  async my(
    @Param() dto: PlaylistMyReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataPlaylistResDto>> {
    return this.playlistService.my(dto, sub);
  }

  @Get("top/:from/:limit")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async top(
    @Param() dto: PlaylistTopReqDto
  ): Promise<DataPaginationResDto<DataPlaylistResDto>> {
    return this.playlistService.top(dto);
  }
}
