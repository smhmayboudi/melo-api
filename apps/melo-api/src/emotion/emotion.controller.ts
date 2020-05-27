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
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  EmotionConfigReqDto,
  EmotionEmotionsParamReqDto,
  EmotionEmotionsQueryReqDto,
  EmotionEmotionsResDto,
} from "@melo/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { DataConfigService } from "../data/data.config.service";
import { EmotionConfigService } from "./emotion.config.service";
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
  private config: EmotionConfigReqDto = {
    indexName: this.emotionConfigService.indexName,
    maxSize: this.emotionConfigService.maxSize,
  };
  private dataConfigElasticSearch: DataConfigElasticSearchReqDto = {
    imagePath: this.dataConfigService.imagePath,
    imagePathDefaultAlbum: this.dataConfigService.imagePathDefaultAlbum,
    imagePathDefaultArtist: this.dataConfigService.imagePathDefaultArtist,
    imagePathDefaultSong: this.dataConfigService.imagePathDefaultSong,
    indexName: this.dataConfigService.indexName,
    maxSize: this.dataConfigService.maxSize,
    mp3Endpoint: this.dataConfigService.mp3Endpoint,
  };
  private dataConfigImage: DataConfigImageReqDto = {
    imageBaseUrl: this.dataConfigService.imageBaseUrl,
    imageEncode: this.dataConfigService.imageEncode,
    imageKey: this.dataConfigService.imageKey,
    imageSalt: this.dataConfigService.imageSalt,
    imageSignatureSize: this.dataConfigService.imageSignatureSize,
    imageTypeSize: this.dataConfigService.imageTypeSize,
  };

  constructor(
    private readonly dataConfigService: DataConfigService,
    private readonly emotionConfigService: EmotionConfigService,
    private readonly emotionService: EmotionService
  ) {}

  @Get("/:from/:size")
  @UseGuards(AuthGuard("jwt"))
  async emotions(
    @Param() paramDto: EmotionEmotionsParamReqDto,
    @Query() queryDto: EmotionEmotionsQueryReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<DataPaginationResDto<EmotionEmotionsResDto>> {
    return this.emotionService.emotions({
      ...paramDto,
      ...queryDto,
      config: this.config,
      dataConfigElasticSearch: this.dataConfigElasticSearch,
      dataConfigImage: this.dataConfigImage,
      sub,
    });
  }
}
