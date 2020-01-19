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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { AlbumService } from "./album.service";
import { AlbumDto } from "./dto/album.dto";
import { PaginationResultDto } from "./dto/pagination.result.dto";

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

  @Get(":id")
  async get(@Param("id") id: string): Promise<AlbumDto> {
    return this.albumService.get({
      id
    });
  }

  @Get("latest/:language")
  async lstest(
    @Param("language") language: string
  ): Promise<PaginationResultDto<AlbumDto>> {
    return this.albumService.latest({
      from: 0,
      language,
      limit: 10
    });
  }
}
