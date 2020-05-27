import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  DataPaginationResDto,
  DataSearchType,
} from "@melo/common";

import { DataArtistServiceInterface } from "./data.artist.service.interface";
import { DataTransformService } from "./data.transform.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class DataArtistService implements DataArtistServiceInterface {
  constructor(
    private readonly dataTransformService: DataTransformService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: ArtistGetReqDto): Promise<ArtistResDto> {
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
      index: dto.dataConfigElasticSearch.indexName,
      type: DataSearchType.music,
    });
    return this.dataTransformService.artist({
      ...elasticSearchRes.body.hits.hits[0]._source,
      imagePath: dto.dataConfigElasticSearch.imagePath,
      imagePathDefaultArtist:
        dto.dataConfigElasticSearch.imagePathDefaultArtist,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getByIds(
    dto: ArtistGetByIdsReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>> {
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
        size: dto.dataConfigElasticSearch.maxSize,
      },
      index: dto.dataConfigElasticSearch.indexName,
      type: DataSearchType.music,
    });
    const results = (await Promise.all(
      elasticSearchRes.body.hits.hits.map(async (value) => {
        return await this.dataTransformService.artist({
          ...value._source.artists[0],
          imagePath: dto.dataConfigElasticSearch.imagePath,
          imagePathDefaultArtist:
            dto.dataConfigElasticSearch.imagePathDefaultArtist,
          tags: value._source.tags,
        });
      })
    )) as ArtistResDto[];
    return {
      results,
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<ArtistResDto>;
  }

  // TODO: implement
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trending(
    dto: ArtistTrendingReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>> {
    return this.getByIds({ ...dto, ids: [498] }); //189978
  }

  // TODO: implement
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trendingGenre(
    dto: ArtistTrendingGenreReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>> {
    return this.getByIds({ ...dto, ids: [498] }); //189978
  }
}
