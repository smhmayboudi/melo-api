import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
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
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { User } from "../decorator/user.decorator";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { PlaylistAddSongReqDto } from "./dto/req/playlist.add-song.req.dto";
import { PlaylistCreateReqDto } from "./dto/req/playlist.create.req.dto";
import { PlaylistDeleteReqDto } from "./dto/req/playlist.delete.req.dto";
import { PlaylistEditReqDto } from "./dto/req/playlist.edit.req.dto";
import { PlaylistGetReqDto } from "./dto/req/playlist.get.req.dto";
import { PlaylistMyReqDto } from "./dto/req/playlist.my.req.dto";
import { PlaylistSongReqDto } from "./dto/req/playlist.song.req.dto";
import { PlaylistTopReqDto } from "./dto/req/playlist.top.req.dto";
import { PlaylistService } from "./playlist.service";

@ApiBearerAuth("jwt")
@ApiTags("playlist")
@Controller("playlist")
@UseInterceptors(ClassSerializerInterceptor, ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @ApiParam({
    name: "songId",
    type: String
  })
  @Post("addSong")
  @UseGuards(AuthGuard("jwt"))
  async addSong(
    @Body() dto: PlaylistAddSongReqDto,
    @Body("songId", HashIdPipe) songId: number
  ): Promise<DataPlaylistResDto> {
    return this.playlistService.addSong(dto, songId);
  }

  @Post("create")
  @UseGuards(AuthGuard("jwt"))
  async create(
    @Body() dto: PlaylistCreateReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPlaylistResDto> {
    return this.playlistService.create(dto, sub);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async delete(
    @Param() dto: PlaylistDeleteReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPlaylistResDto> {
    return this.playlistService.delete(dto, sub);
  }

  @ApiParam({
    name: "songId",
    type: String
  })
  @Delete("song/:playlistId/:songId")
  @UseGuards(AuthGuard("jwt"))
  async deleteSong(
    @Param() dto: PlaylistSongReqDto,
    @Param("songId", HashIdPipe) songId: number
  ): Promise<DataPlaylistResDto> {
    return this.playlistService.deleteSong(dto, songId);
  }

  @Post("edit")
  @UseGuards(AuthGuard("jwt"))
  async edit(@Body() dto: PlaylistEditReqDto): Promise<DataPlaylistResDto> {
    return this.playlistService.edit(dto);
  }

  @Get(":id")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async get(@Param() dto: PlaylistGetReqDto): Promise<DataPlaylistResDto> {
    return this.playlistService.get(dto);
  }

  @Get("my/:from/:limit")
  @UseGuards(AuthGuard("jwt"))
  async my(
    @Param() dto: PlaylistMyReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataPlaylistResDto>> {
    return this.playlistService.my(dto, sub);
  }

  @Get("top/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async top(
    @Param() dto: PlaylistTopReqDto
  ): Promise<DataPaginationResDto<DataPlaylistResDto>> {
    return this.playlistService.top(dto);
  }
}
