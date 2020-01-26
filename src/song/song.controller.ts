import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { SongDto } from "../data/dto/song.dto";
import { User } from "../decorator/user.decorator";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HashIdPipe } from "../pipe/hash-id.pipe";
import { SongLikeDto } from "./dto/song.like.dto";
import { SongSendTelegramDto } from "./dto/song.send.telegram.dto";
import { SongUnlikeDto } from "./dto/song.unlike.dto";
import { SongService } from "./song.service";

@ApiBearerAuth("jwt")
@ApiTags("song")
@Controller("song")
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
export class SongController {
  constructor(private readonly songService: SongService) {}

  @ApiParam({
    name: "id",
    type: "string"
  })
  @Get(":id")
  async byId(@Param("id", HashIdPipe) id: number): Promise<SongDto> {
    return this.songService.byId({
      id
    });
  }

  @Get("genre/:orderBy/:from/:limit")
  async genre(
    @Param("orderBy") orderBy: string,
    @Param("from") from: number,
    @Param("limit") limit: number,
    @Query("genres") genres: string[]
  ): Promise<PaginationResultDto<SongDto>> {
    return this.songService.genre({
      from,
      genres,
      limit,
      orderBy
    });
  }

  @Get("language/:language/:orderBy/:from/:limit")
  async language(
    @Param("language") language: string,
    @Param("orderBy") orderBy: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<SongDto>> {
    return this.songService.language({
      from,
      language,
      limit,
      orderBy
    });
  }

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
  @Post("like")
  // TODO: convert hash to number HashIdPipe
  async like(
    @Body() dto: SongLikeDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<boolean> {
    return this.songService.like(dto, sub);
  }

  @Get("liked/:from/:limit")
  async liked(
    @Param("from") from: number,
    @Param("limit") limit: number,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<PaginationResultDto<SongDto>> {
    return this.songService.liked(
      {
        from,
        limit
      },
      sub
    );
  }

  @Get("mood/:mood/:from/:limit")
  async mood(
    @Param("mood") mood: string,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<SongDto>> {
    return this.songService.mood({
      from,
      limit,
      mood
    });
  }

  @Get("new/:from/:limit")
  async new(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<SongDto>> {
    return this.songService.new({
      from,
      limit
    });
  }

  @Get("new/podcast/:from/:limit")
  async newPodcast(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<SongDto>> {
    return this.songService.newPodcast({
      limit,
      from
    });
  }

  @Get("podcast/genres/:orderBy/:from/:limit")
  async podcast(
    @Param("orderBy") orderBy: string,
    @Param("from") from: number,
    @Param("limit") limit: number,
    @Query("genres") genres: string[]
  ): Promise<PaginationResultDto<SongDto>> {
    return this.songService.podcast({
      from,
      genres,
      limit,
      orderBy
    });
  }

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
  @Post("send/telegram")
  // TODO: convert hash to number HashIdPipe
  async sendTelegram(
    @Body() dto: SongSendTelegramDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<number> {
    return this.songService.sendTelegram(
      {
        id: dto.id
      },
      sub
    );
  }

  @Get("similar/:id/:from/:limit")
  async similar(
    @Param("id", HashIdPipe) id: number,
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<SongDto>> {
    return this.songService.similar({
      from,
      id,
      limit
    });
  }

  @Get("slider/latest")
  async sliderLatest(@User("sub", ParseIntPipe) sub: number): Promise<any> {
    return this.songService.sliderLatest(sub);
  }

  @Get("top/day/:from/:limit")
  async topDay(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<SongDto>> {
    return this.songService.topDay({
      from,
      limit
    });
  }

  @Get("top/week/:from/:limit")
  async topWeek(
    @Param("from") from: number,
    @Param("limit") limit: number
  ): Promise<PaginationResultDto<SongDto>> {
    return this.songService.topWeek({
      from,
      limit
    });
  }

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
  @Post("unlike")
  // TODO: convert hash to number HashIdPipe
  async unlike(
    @Body() dto: SongUnlikeDto,
    @User("sub", ParseIntPipe) sub: number
  ): Promise<boolean> {
    return this.songService.unlike(dto, sub);
  }
}
