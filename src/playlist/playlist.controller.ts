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
import { PlaylistDto } from "../data/dto/playlist.dto";
import { User } from "../decorator/user.decorator";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { PlaylistAddSongDto } from "./dto/playlist.add.song.dto";
import { PlaylistCreateDto } from "./dto/playlist.create.dto";
import { PlaylistDeleteDto } from "./dto/playlist.delete.dto";
import { PlaylistEditDto } from "./dto/playlist.edit.dto";
import { PlaylistGetDto } from "./dto/playlist.get.dto";
import { PlaylistMyDto } from "./dto/playlist.my.dto";
import { PlaylistSongDto } from "./dto/playlist.song.dto";
import { PlaylistTopDto } from "./dto/playlist.top.dto";
import { PlaylistService } from "./playlist.service";

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
    @Body() dto: PlaylistAddSongDto,
    @Body("songId", HashIdPipe) songId: number
  ): Promise<PlaylistDto> {
    return this.playlistService.addSong(dto, songId);
  }

  @Post("create")
  async create(
    @Body() dto: PlaylistCreateDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<PlaylistDto> {
    return this.playlistService.create(dto, sub);
  }

  @Delete(":id")
  async delete(
    @Param() dto: PlaylistDeleteDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<boolean> {
    return this.playlistService.delete(dto, sub);
  }

  @Delete("song/:playlistId/:songId")
  async deleteSong(
    @Param() dto: PlaylistSongDto,
    @Param("songId", HashIdPipe) songId: number
  ): Promise<PlaylistDto> {
    return this.playlistService.deleteSong(dto, songId);
  }

  @Post("edit")
  async edit(@Body() dto: PlaylistEditDto): Promise<PlaylistDto> {
    return this.playlistService.edit(dto);
  }

  @Get(":id")
  async get(@Param() dto: PlaylistGetDto): Promise<PlaylistDto> {
    return this.playlistService.get(dto);
  }

  @Get("my/:from/:limit")
  async my(
    @Param() dto: PlaylistMyDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<any> {
    return this.playlistService.my(dto, sub);
  }

  @Get("top")
  async top(@Param() dto: PlaylistTopDto): Promise<any> {
    return this.playlistService.top(dto);
  }
}
