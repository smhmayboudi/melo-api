import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { AlbumService } from "./album.service";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumAlbumResDto } from "./dto/res/album.album.res.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";
import { AlbumPaginationResDto } from "./dto/res/album.pagination.res.dto";

@ApiBearerAuth("jwt")
@ApiTags("album")
@Controller("album")
@UseGuards(AuthGuard("jwt"))
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

  @Get(":id")
  async byId(
    @Param() dto: AlbumByIdReqDto,
    @Param("id", HashIdPipe) id: number
  ): Promise<AlbumAlbumResDto> {
    return this.albumService.byId(dto, id);
  }

  @Get("latest/:language/:from/:limit")
  async lstest(
    @Param() dto: AlbumLatestReqDto
  ): Promise<AlbumPaginationResDto<AlbumAlbumResDto>> {
    return this.albumService.latest(dto);
  }
}
