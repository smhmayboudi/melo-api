import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../decorator/user.decorator";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
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
import { PlaylistPlaylistResDto } from "./dto/res/playlist.playlist.res.dto";
import { PlaylistService } from "./playlist.service";
import { PlaylistPaginationResDto } from "./dto/res/playlist.pagination.res.dto";

@ApiBearerAuth("jwt")
@ApiTags("playlist")
@Controller("playlist")
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
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post("addSong")
  async addSong(
    @Body() dto: PlaylistAddSongReqDto,
    @Body("songId", HashIdPipe) songId: number
  ): Promise<PlaylistPlaylistResDto> {
    return this.playlistService.addSong(dto, songId);
  }

  @Post("create")
  async create(
    @Body() dto: PlaylistCreateReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<PlaylistPlaylistResDto> {
    return this.playlistService.create(dto, sub);
  }

  @Delete(":id")
  async delete(
    @Param() dto: PlaylistDeleteReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<PlaylistPlaylistResDto> {
    return this.playlistService.delete(dto, sub);
  }

  @Delete("song/:playlistId/:songId")
  async deleteSong(
    @Param() dto: PlaylistSongReqDto,
    @Param("songId", HashIdPipe) songId: number
  ): Promise<PlaylistPlaylistResDto> {
    return this.playlistService.deleteSong(dto, songId);
  }

  @Post("edit")
  async edit(@Body() dto: PlaylistEditReqDto): Promise<PlaylistPlaylistResDto> {
    return this.playlistService.edit(dto);
  }

  @Get(":id")
  async get(@Param() dto: PlaylistGetReqDto): Promise<PlaylistPlaylistResDto> {
    return this.playlistService.get(dto);
  }

  @Get("my/:from/:limit")
  async my(
    @Param() dto: PlaylistMyReqDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<PlaylistPaginationResDto<PlaylistPlaylistResDto>> {
    return this.playlistService.my(dto, sub);
  }

  @Get("top")
  async top(
    @Param() dto: PlaylistTopReqDto
  ): Promise<PlaylistPaginationResDto<PlaylistPlaylistResDto>> {
    return this.playlistService.top(dto);
  }
}
