import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
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
import { TelegramSendSongDto } from "./dto/telegram.send.song.dto";
import { TelegramService } from "./telegram.service";

@ApiBearerAuth("jwt")
@ApiTags("telegram")
@Controller("telegram")
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
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post("send/song")
  async sendSong(@Body() dto: TelegramSendSongDto): Promise<any> {
    return this.telegramService.sendSong({
      songId: dto.songId
    });
  }
}
