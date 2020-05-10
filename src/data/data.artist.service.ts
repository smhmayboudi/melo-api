import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { DataArtistByIdReqDto } from "./dto/req/data.artist.by-id.req.dto";
import { DataArtistByIdsReqDto } from "./dto/req/data.artist.by.ids.req.dto";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataArtistServiceInterface } from "./data.artist.service.interface";
import { DataConfigService } from "./data.config.service";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchType } from "./data.search.type";
import { DataTransformService } from "./data.transform.service";
import { DataTrendingGenreReqDto } from "./dto/req/data.trending-genre.req.dto";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";

@Injectable()
// @PromInstanceCounter
export class DataArtistService implements DataArtistServiceInterface {
  constructor(
    private readonly dataConfigService: DataConfigService,
    private readonly dataTransformService: DataTransformService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byId(dto: DataArtistByIdReqDto): Promise<DataArtistResDto> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: { excludes: ["tags"] },
        from: 0,
        query: {
          bool: {
            must: [
              {
                match: {
                  type: DataSearchType.artist,
                },
              },
              {
                terms: {
                  id: [dto.id],
                },
              },
            ],
          },
        },
        size: 1,
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return this.dataTransformService.transformArtist(
      elasticSearchRes.body.hits.hits[0]._source
    );
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byIds(
    dto: DataArtistByIdsReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: { excludes: ["tags"] },
        query: {
          bool: {
            must: [
              {
                match: {
                  type: DataSearchType.artist,
                },
              },
              {
                terms: {
                  id: dto.ids,
                },
              },
            ],
          },
        },
        size: this.dataConfigService.resultSize,
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) => {
        return this.dataTransformService.transformArtist({
          ...value._source.artists[0],
          tags: value._source.tags,
        });
      }),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataArtistResDto>;
  }

  // TODO: implement
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trending(): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.byIds({ ids: [498] }); //189978
  }

  // TODO: implement
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trendingGenre(
    _dto: DataTrendingGenreReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.byIds({ ids: [498] }); //189978
  }
}
