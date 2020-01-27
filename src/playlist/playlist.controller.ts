import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  ParseIntPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { PlaylistAddSongDto } from "./dto/playlist.add.song.dto";
import { PlaylistCreateDto } from "./dto/playlist.create.dto";
import { PlaylistEditDto } from "./dto/playlist.edit.dto";
import { PlaylistService } from "./playlist.service";
import { User } from "src/decorator/user.decorator";

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

  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string"
        }
      }
    }
  })
  @Post("addSong")
  // TODO: convert hash to number HashIdPipe
  async addSong(@Body() dto: PlaylistAddSongDto): Promise<any> {
    return this.playlistService.addSong({
      playlistId: dto.playlistId,
      songId: dto.songId
    });
  }

  @Post("create")
  async create(
    @Body() dto: PlaylistCreateDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<any> {
    return this.playlistService.create(
      {
        title: dto.title,
        photoId: dto.photoId
      },
      sub
    );
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<any> {
    return this.playlistService.delete({
      id
    });
  }

  @Post("edit")
  async edit(@Body() dto: PlaylistEditDto): Promise<any> {
    return this.playlistService.edit({
      id: dto.id,
      isPublic: dto.isPublic,
      photoId: dto.photoId,
      title: dto.title
    });
  }

  @Get(":id")
  async get(@Param("id") id: string): Promise<any> {
    return this.playlistService.get({
      id
    });
  }

  @Get("my/:from/:limit")
  async my(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.playlistService.my({
      from,
      limit
    });
  }

  @Delete("song/:playlistId/:songId")
  async song(
    @Param("playlistId") playlistId: string,
    @Param("songId", HashIdPipe) songId: number
  ): Promise<any> {
    return this.playlistService.song({
      playlistId,
      songId
    });
  }

  @Get("top")
  async top(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<any> {
    return this.playlistService.top({
      from,
      limit
    });
  }
}
