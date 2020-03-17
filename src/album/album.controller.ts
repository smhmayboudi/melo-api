import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";

import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";
import { AlbumService } from "./album.service";
import { AppHashIdPipe } from "../app/app.hash-id.pipe";
import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";

@ApiBearerAuth("jwt")
@ApiTags("album")
@Controller("album")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiParam({
    name: "artistId",
    type: String
  })
  @Get("artist/albums/:artistId/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async artistAlbums(
    @Param() dto: AlbumArtistAlbumsReqDto,
    @Param("artistId", AppHashIdPipe) artistId: number,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.albumService.artistAlbums(dto, artistId, sub);
  }

  @ApiParam({
    name: "id",
    type: String
  })
  @Get(":id")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async byId(
    @Param() dto: AlbumByIdReqDto,
    @Param("id", AppHashIdPipe) id: number,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataAlbumResDto> {
    return this.albumService.byId(dto, id, sub);
  }

  @Get("latest/:language/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async latest(
    @Param() dto: AlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.albumService.latest(dto);
  }
}
