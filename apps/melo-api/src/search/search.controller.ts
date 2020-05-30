import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  SearchConfigReqDto,
  SearchMoodParamReqDto,
  SearchMoodQueryReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";

import { AuthGuard } from "@nestjs/passport";
import { DataConfigService } from "../data/data.config.service";
import { SearchConfigService } from "./search.config.service";
import { SearchHashIdInterceptor } from "./search.hash-id.interceptor";
import { SearchService } from "./search.service";

@UseInterceptors(SearchHashIdInterceptor)
@ApiBearerAuth("jwt")
@ApiTags("search")
@Controller("search")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class SearchController {
  private config: SearchConfigReqDto = {
    indexName: this.searchConfigService.indexName,
    maxSize: this.searchConfigService.maxSize,
    scriptScore: this.searchConfigService.scriptScore,
    suggestIndex: this.searchConfigService.suggestIndex,
  };
  private dataConfigElasticsearch: DataConfigElasticsearchReqDto = {
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
    private readonly searchConfigService: SearchConfigService,
    private readonly searchService: SearchService
  ) {}

  @Get("query/:query/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async query(@Param() dto: SearchQueryReqDto): Promise<SearchResDto[]> {
    return this.searchService.query({
      ...dto,
      config: this.config,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
      dataConfigImage: this.dataConfigImage,
    });
  }

  @Get("mood/:from/:size")
  @UseGuards(AuthGuard(["jwt", "anonymId"]))
  async mood(
    @Param() paramDto: SearchMoodParamReqDto,
    @Query() queryDto: SearchMoodQueryReqDto
  ): Promise<SongResDto[]> {
    return this.searchService.mood({
      ...paramDto,
      ...queryDto,
      config: this.config,
      dataConfigElasticsearch: this.dataConfigElasticsearch,
    });
  }
}
