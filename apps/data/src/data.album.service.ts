import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  DataPaginationResDto,
  DataSearchType,
  DataSortByType,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";

import { DataAlbumServiceInterface } from "./data.album.service.interface";
import { DataSongService } from "./data.song.service";
import { DataTransformService } from "./data.transform.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class DataAlbumService implements DataAlbumServiceInterface {
  constructor(
    private readonly dataSongService: DataSongService,
    private readonly dataTransformService: DataTransformService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async albums(
    dto: AlbumArtistsReqDto
  ): Promise<DataPaginationResDto<AlbumResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: { excludes: ["tags"] },
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                match: {
                  type: DataSearchType.album,
                },
              },
              {
                match: {
                  artists_ids: dto.id,
                },
              },
            ],
          },
        },
        size: Math.min(dto.dataConfigElasticSearch.maxSize, dto.size),
        sort: [{ release_date: DataSortByType.desc }],
      },
      index: dto.dataConfigElasticSearch.indexName,
      type: DataSearchType.music,
    });
    const results = (await Promise.all(
      elasticSearchRes.body.hits.hits.map(
        async (value) =>
          await this.dataTransformService.album({
            ...value._source,
            imagePath: dto.dataConfigElasticSearch.imagePath,
            imagePathDefaultAlbum:
              dto.dataConfigElasticSearch.imagePathDefaultAlbum,
          })
      )
    )) as AlbumResDto[];
    return {
      results,
      total: results.length,
    } as DataPaginationResDto<AlbumResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: AlbumGetReqDto): Promise<AlbumResDto> {
    const elasticSearchRes = await this.elasticsearchService.get({
      id: `album-${dto.id}`,
      index: dto.dataConfigElasticSearch.indexName,
      type: DataSearchType.music,
    });
    const album = await this.dataTransformService.album({
      ...elasticSearchRes.body.hits.hits[0]._source,
      imagePath: dto.dataConfigElasticSearch.imagePath,
      imagePathDefaultAlbum: dto.dataConfigElasticSearch.imagePathDefaultAlbum,
    });
    const songs = await this.dataSongService.albumSongs(dto);
    return {
      ...album,
      songs,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async latest(
    dto: AlbumLatestReqDto
  ): Promise<DataPaginationResDto<AlbumResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: { excludes: ["tags"] },
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                term: {
                  "type.keyword": DataSearchType.album,
                },
              },
              dto.language === "all"
                ? undefined
                : { term: { "language.keyword": dto.language } },
            ],
            must_not: [
              {
                term: {
                  "album.keyword": "Radio Javan",
                },
              },
            ],
          },
        },
        size: Math.min(dto.dataConfigElasticSearch.maxSize, dto.size),
        sort: [{ release_date: DataSortByType.desc }],
      },
      index: dto.dataConfigElasticSearch.indexName,
      type: DataSearchType.music,
    });
    const results = (await Promise.all(
      elasticSearchRes.body.hits.hits.map(
        async (value) =>
          await this.dataTransformService.album({
            ...value._source,
            imagePath: dto.dataConfigElasticSearch.imagePath,
            imagePathDefaultAlbum:
              dto.dataConfigElasticSearch.imagePathDefaultAlbum,
          })
      )
    )) as AlbumResDto[];
    return {
      results,
      total: results.length,
    } as DataPaginationResDto<AlbumResDto>;
  }
}
