import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  DataElasticsearchSearchResDto,
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
  async albums(dto: AlbumArtistsReqDto): Promise<AlbumResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: DataElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        _source: {
          excludes: ["tags"],
        },
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
        size: Math.min(dto.dataConfigElasticsearch.maxSize, dto.size),
        sort: [
          {
            release_date: DataSortByType.desc,
          },
        ],
      },
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return Promise.all(
      elasticsearchSearch.body.hits.hits.map((value) =>
        this.dataTransformService.album({
          ...value._source,
          dataConfigElasticsearch: dto.dataConfigElasticsearch,
          dataConfigImage: dto.dataConfigImage,
        })
      )
    );
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: AlbumGetReqDto): Promise<AlbumResDto> {
    const elasticsearchGet = await this.elasticsearchService.get<
      Record<string, DataElasticsearchSearchResDto>,
      any
    >({
      id: `album-${dto.id}`,
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    const album = await this.dataTransformService.album({
      ...elasticsearchGet.body._source,
      dataConfigElasticsearch: dto.dataConfigElasticsearch,
      dataConfigImage: dto.dataConfigImage,
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
  async latest(dto: AlbumLatestReqDto): Promise<AlbumResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: DataElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        _source: {
          excludes: ["tags"],
        },
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
                : {
                    term: {
                      "language.keyword": dto.language,
                    },
                  },
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
        size: Math.min(dto.dataConfigElasticsearch.maxSize, dto.size),
        sort: [
          {
            release_date: DataSortByType.desc,
          },
        ],
      },
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return Promise.all(
      elasticsearchSearch.body.hits.hits.map((value) =>
        this.dataTransformService.album({
          ...value._source,
          dataConfigElasticsearch: dto.dataConfigElasticsearch,
          dataConfigImage: dto.dataConfigImage,
        })
      )
    );
  }
}
