import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { DataAlbumArtistsReqDto } from "./dto/req/data.album.artists.req.dto";
import { DataAlbumByIdReqDto } from "./dto/req/data.album.by-id.req.dto";
import { DataAlbumLatestReqDto } from "./dto/req/data.album.latest.req.dto";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataAlbumServiceInterface } from "./data.album.service.interface";
import { DataConfigService } from "./data.config.service";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchType } from "./data.search.type";
import { DataSongService } from "./data.song.service";
import { DataSortByType } from "./data.sort-by.type";
import { DataTransformService } from "./data.transform.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";

@Injectable()
// @PromInstanceCounter
export class DataAlbumService implements DataAlbumServiceInterface {
  constructor(
    private readonly dataConfigService: DataConfigService,
    private readonly dataSongService: DataSongService,
    private readonly dataTransformService: DataTransformService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async albums(
    dto: DataAlbumArtistsReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
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
        size: Math.min(dto.size, this.dataConfigService.resultSize),
        sort: [{ release_date: DataSortByType.desc }],
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformAlbum(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataAlbumResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byId(dto: DataAlbumByIdReqDto): Promise<DataAlbumResDto> {
    const elasticSearchRes = await this.elasticsearchService.get({
      id: `album-${dto.id}`,
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    const songs = await this.dataSongService.albumSongs(dto);
    return {
      ...this.dataTransformService.transformAlbum(
        elasticSearchRes.body.hits.hits[0]._source
      ),
      songs,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async latest(
    dto: DataAlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
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
        size: Math.min(dto.size, this.dataConfigService.resultSize),
        sort: [{ release_date: DataSortByType.desc }],
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformAlbum(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataAlbumResDto>;
  }
}
