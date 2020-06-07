import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  EmotionEmotionsParamReqDto,
  EmotionEmotionsQueryReqDto,
  EmotionEmotionsResDto,
} from "@melo/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { EmotionHashIdInterceptor } from "./emotion.hash-id.interceptor";
import { EmotionLikeInterceptor } from "./emotion.like.interceptor";
import { EmotionService } from "./emotion.service";

@UseInterceptors(EmotionLikeInterceptor, EmotionHashIdInterceptor)
@ApiBearerAuth("jwt")
@ApiTags("emotion")
@Controller("emotion")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class EmotionController {
  constructor(private readonly emotionService: EmotionService) {}

  @Get("/:from/:size")
  @UseGuards(AuthGuard("jwt"))
  async emotions(
    @Param() paramDto: EmotionEmotionsParamReqDto,
    @Query() queryDto: EmotionEmotionsQueryReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<EmotionEmotionsResDto[]> {
    return this.emotionService.emotions({
      ...paramDto,
      ...queryDto,
      sub,
    });
  }
}
