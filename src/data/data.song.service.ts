import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { DATA_TYPEORM } from "../app/app.constant";

import { DataCacheEntity } from "./data.cache.entity";
import { DataCacheEntityRepository } from "./data.cache.entity.repository";
import { DataConfigService } from "./data.config.service";
import { DataOrderByType } from "./data.order-by.type";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataQueryType } from "./data.query.type";
import { DataSearchType } from "./data.search.type";
import { DataSiteEntity } from "./data.site.entity";
import { DataSiteEntityRepository } from "./data.site.entity.repository";
import { DataSongAlbumReqDto } from "./dto/req/data.song.album.req.dto";
import { DataSongArtistSongsTopReqDto } from "./dto/req/data.song.artist-songs-top.req.dto";
import { DataSongArtistsReqDto } from "./dto/req/data.song.artists.req.dto";
import { DataSongByIdReqDto } from "./dto/req/data.song.by-id.req.dto";
import { DataSongByIdsReqDto } from "./dto/req/data.song.by-ids.req.dto";
import { DataSongGenreReqDto } from "./dto/req/data.song.genre.req.dto";
import { DataSongLanguageReqDto } from "./dto/req/data.song.language.req.dto";
import { DataSongMoodReqDto } from "./dto/req/data.song.mood.req.dto";
import { DataSongNewPodcastReqDto } from "./dto/req/data.song.new-podcast.req.dto";
import { DataSongNewReqDto } from "./dto/req/data.song.new.req.dto";
import { DataSongPodcastReqDto } from "./dto/req/data.song.podcast.req.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";
import { DataSongServiceInterface } from "./data.song.service.interface";
import { DataSongSimilarReqDto } from "./dto/req/data.song.similar.req.dto";
import { DataSongTopDayReqDto } from "./dto/req/data.song.top-day.req.dto";
import { DataSongTopWeekReqDto } from "./dto/req/data.song.top-week.req.dto";
import { DataSortByType } from "./data.sort-by.type";
import { DataTransformService } from "./data.transform.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class DataSongService implements DataSongServiceInterface {
  constructor(
    @InjectRepository(DataCacheEntity, DATA_TYPEORM)
    private readonly dataCacheEntityRepository: DataCacheEntityRepository,
    private readonly dataConfigService: DataConfigService,
    private readonly dataTransformService: DataTransformService,
    private readonly elasticsearchService: ElasticsearchService,
    @InjectRepository(DataSiteEntity, DATA_TYPEORM)
    private readonly dataSiteEntityRepository: DataSiteEntityRepository
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  private async query(
    query: string,
    from: number,
    size: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const dataCacheEntity = await this.dataCacheEntityRepository
      .createQueryBuilder()
      .where({ name: query })
      .orderBy("id DESC")
      .limit(1)
      .getOne();
    if (dataCacheEntity === undefined) {
      return {
        results: [] as DataSongResDto[],
        total: 0,
      } as DataPaginationResDto<DataSongResDto>;
    }
    return this.byIds({
      ids: JSON.parse(dataCacheEntity.result)
        .filter((value) => value.type === DataSearchType.song)
        .filter((value) => value.id)
        .slice(from, from + size)
        .map((value) => value.id),
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async albumSongs(
    dto: DataSongAlbumReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        from: 0,
        query: {
          bool: {
            must: [
              {
                match: {
                  type: DataSearchType.song,
                },
              },
              {
                term: {
                  album_id: dto.id,
                },
              },
              {
                term: {
                  copyright: false,
                },
              },
            ],
          },
        },
        size: this.dataConfigService.resultSize,
        sort: [{ track: DataSortByType.asc }],
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformSong(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongs(
    dto: DataSongArtistsReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                term: {
                  type: DataSearchType.song,
                },
              },
              {
                term: {
                  artists_ids: dto.id,
                },
              },
              {
                term: {
                  copyright: false,
                },
              },
            ],
          },
        },
        size: Math.min(dto.size, this.dataConfigService.resultSize),
        sort: [
          {
            release_date: DataSortByType.desc,
          },
        ],
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformSong(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongsTop(
    dto: DataSongArtistSongsTopReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                term: {
                  type: DataSearchType.song,
                },
              },
              {
                term: {
                  artists_ids: dto.id,
                },
              },
              {
                term: {
                  copyright: false,
                },
              },
            ],
          },
        },
        size: Math.min(dto.size, this.dataConfigService.resultSize),
        sort: [
          {
            downloads_count: DataSortByType.desc,
          },
        ],
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformSong(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byId(dto: DataSongByIdReqDto): Promise<DataSongResDto> {
    const elasticSearchRes = await this.elasticsearchService.get({
      id: `song-${dto.id}`,
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return this.dataTransformService.transformSong(
      elasticSearchRes.body._source
    );
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byIds(
    dto: DataSongByIdsReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: { excludes: ["tags", "lyrics"] },
        query: {
          bool: {
            must: [
              {
                terms: {
                  "type.keyword": [DataSearchType.podcast, DataSearchType.song],
                },
              },
              {
                terms: {
                  id: dto.ids,
                },
              },
              {
                term: {
                  copyright: false,
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
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformSong(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async genre(
    dto: DataSongGenreReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                terms: {
                  "type.keyword": [DataSearchType.song],
                },
              },
              {
                term: {
                  copyright: false,
                },
              },
              dto.genres[0] === "all"
                ? undefined
                : { terms: { "genre.keyword": dto.genres } },
            ],
          },
        },
        size: Math.min(dto.size, this.dataConfigService.resultSize),
        sort: {
          [dto.orderBy === DataOrderByType.release
            ? "release_date"
            : dto.orderBy === DataOrderByType.downloads
            ? "downloads_count"
            : ""]: DataSortByType.desc,
        },
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformSong(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async language(
    dto: DataSongLanguageReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                terms: {
                  "type.keyword": [DataSearchType.song],
                },
              },
              {
                term: {
                  language: dto.language,
                },
              },
              {
                term: {
                  copyright: false,
                },
              },
            ],
          },
        },
        size: Math.min(dto.size, this.dataConfigService.resultSize),
        sort: { [dto.orderBy]: DataSortByType.desc },
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformSong(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(
    dto: DataSongMoodReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                terms: {
                  "type.keyword": [DataSearchType.song],
                },
              },
              {
                term: {
                  copyright: false,
                },
              },
              {
                range: {
                  "emotions.users": {
                    gte: 500,
                  },
                },
              },
            ],
          },
        },
        size: Math.min(dto.size, this.dataConfigService.resultSize),
        sort: { [`emotions.${dto.mood}`]: { order: DataSortByType.desc } },
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformSong(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newPodcast(
    dto: DataSongNewPodcastReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.query(DataQueryType.podcast, dto.from, dto.size);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newSong(
    dto: DataSongNewReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.query(DataQueryType.new, dto.from, dto.size);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async podcast(
    dto: DataSongPodcastReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                terms: {
                  "type.keyword": [DataSearchType.podcast],
                },
              },
              {
                term: {
                  copyright: false,
                },
              },
              dto.genres[0] === "all"
                ? undefined
                : {
                    terms: {
                      "genre.keyword": dto.genres,
                    },
                  },
            ],
          },
        },
        size: Math.min(dto.size, this.dataConfigService.resultSize),
        sort: { [dto.orderBy]: DataSortByType.desc },
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformSong(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async similar(
    dto: DataSongSimilarReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    const songMoods = await this.elasticsearchService.get({
      id: `song-${dto.id}`,
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    if (songMoods.body._source.moods === undefined) {
      return {
        results: [] as DataSongResDto[],
        total: 0,
      } as DataPaginationResDto<DataSongResDto>;
    }
    // TODO: interface ?
    const moods = [
      { classy: songMoods["classy"] },
      { energetic: songMoods["energetic"] },
      { happiness: songMoods["happiness"] },
      { romantic: songMoods["romantic"] },
    ];
    // TODO: interface ?
    const sort: any[] = Object.keys(moods).map((value) => ({
      _script: {
        order: "asc",
        script: {
          lang: "painless",
          source: `Math.abs(${moods[value]}-doc['moods.${value}'].value)`,
        },
        type: "number",
      },
    }));
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: { excludes: ["lyrics", "tags"] },
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                term: {
                  copyright: {
                    value: false,
                  },
                },
              },
              {
                term: {
                  type: {
                    value: DataSearchType.song,
                  },
                },
              },
              {
                term: {
                  copyright: false,
                },
              },
              {
                exists: { field: "moods" },
              },
              {
                bool: {
                  must_not: [
                    {
                      terms: {
                        id: [dto.id],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        size: Math.min(dto.size, this.dataConfigService.resultSize),
        sort,
      },
      index: this.dataConfigService.index,
      type: DataSearchType.music,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformSong(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataSongResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async slider(): Promise<DataPaginationResDto<DataSongResDto>> {
    const songIds = await this.dataSiteEntityRepository
      .createQueryBuilder()
      .orderBy("created_at DESC")
      .getMany();
    return this.byIds({ ids: songIds.map((value) => value.song_id) });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topDay(
    dto: DataSongTopDayReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.query(DataQueryType.topDay, dto.from, dto.size);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topWeek(
    dto: DataSongTopWeekReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.query(DataQueryType.topWeek, dto.from, dto.size);
  }
}
