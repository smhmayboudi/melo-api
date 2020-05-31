import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
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
        _source: {
          excludes: ["tags"],
        },
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
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return this.dataTransformService.artist({
      ...elasticSearchRes.body.hits.hits[0]._source,
      imagePath: dto.dataConfigElasticsearch.imagePath,
      imagePathDefaultArtist:
        dto.dataConfigElasticsearch.imagePathDefaultArtist,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getByIds(dto: ArtistGetByIdsReqDto): Promise<ArtistResDto[]> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: {
          excludes: ["tags"],
        },
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
        size: dto.dataConfigElasticsearch.maxSize,
      },
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return Promise.all(
      elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.artist({
          ...value._source.artists[0],
          imagePath: dto.dataConfigElasticsearch.imagePath,
          imagePathDefaultArtist:
            dto.dataConfigElasticsearch.imagePathDefaultArtist,
          tags: value._source.tags,
        })
      )
    );
  }

  // TODO: implement
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trending(dto: ArtistTrendingReqDto): Promise<ArtistResDto[]> {
    return this.getByIds({
      ...dto,
      ids: [498],
    }); //189978
  }

  // TODO: implement
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trendingGenre(dto: ArtistTrendingGenreReqDto): Promise<ArtistResDto[]> {
    return this.getByIds({
      ...dto,
      ids: [498],
    }); //189978
  }
}
