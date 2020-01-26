import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { AlbumDto } from "../data/dto/album.dto";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { AlbumService } from "./album.service";

@ApiBearerAuth("jwt")
@ApiTags("album")
@Controller("album")
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
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiParam({
    name: "id",
    type: "string"
  })
  @Get(":id")
  async byId(@Param("id", HashIdPipe) id: number): Promise<AlbumDto> {
    return this.albumService.byId({
      id
    });
  }

  @Get("latest/:language/:from/:limit")
  async lstest(
    @Param("language") language: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<AlbumDto>> {
    return this.albumService.latest({
      from,
      language,
      limit
    });
  }
}
