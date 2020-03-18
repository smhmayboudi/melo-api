import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { EmotionParamReqDto } from "./dto/req/emotion.param.req.dto";
import { EmotionQueryReqDto } from "./dto/req/emotion.query.req.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { EmotionService } from "./emotion.service";

@ApiBearerAuth("jwt")
@ApiTags("emotion")
@Controller("emotion")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class EmotionController {
  constructor(private readonly emotionService: EmotionService) {}

  @Get("/:from/:limit")
  @UseGuards(AuthGuard("jwt"))
  async emotions(
    @Param() paramDto: EmotionParamReqDto,
    @Query() queryDto: EmotionQueryReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<EmotionResDto>> {
    return this.emotionService.emotions(paramDto, queryDto, sub);
  }
}
