import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { User } from "../decorator/user.decorator";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { AlbumService } from "./album.service";
import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";

@ApiBearerAuth("jwt")
@ApiTags("album")
@Controller("album")
@UseInterceptors(ClassSerializerInterceptor, ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get("artist/albums/:artistId/:from/:limit")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async artistAlbums(
    @Param() dto: AlbumArtistAlbumsReqDto,
    @Param("artistId", HashIdPipe) artistId: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.albumService.artistAlbums(dto, artistId, sub);
  }

  @Get(":id")
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  async byId(
    @Param() dto: AlbumByIdReqDto,
    @Param("id", HashIdPipe) id: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<DataAlbumResDto> {
    return this.albumService.byId(dto, id, sub);
  }

  @Get("latest/:language/:from/:limit")
  @UseGuards(AuthGuard("jwt"))
  async lstest(
    @Param() dto: AlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.albumService.latest(dto);
  }
}
