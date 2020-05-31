import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  DATA_TYPEORM,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataQueryType,
  DataSearchType,
  DataSortByType,
  SongAlbumReqDto,
  SongArtistSongsTopReqDto,
  SongArtistsReqDto,
  SongGenreReqDto,
  SongGetByIdsReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongOrderByType,
  SongPodcastReqDto,
  SongResDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
} from "@melo/common";

import { ApiResponse } from "@elastic/elasticsearch";
import { DataCacheEntity } from "./data.cache.entity";
import { DataCacheEntityRepository } from "./data.cache.entity.repository";
import { DataSiteEntity } from "./data.site.entity";
import { DataSiteEntityRepository } from "./data.site.entity.repository";
import { DataSongServiceInterface } from "./data.song.service.interface";
import { DataTransformService } from "./data.transform.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class DataSongService implements DataSongServiceInterface {
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async query(
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    from: number,
    query: DataQueryType,
    size: number
  ): Promise<SongResDto[]> {
    const dataCache = await this.dataCacheEntityRepository
      .createQueryBuilder()
      .where({
        name: query,
      })
      .orderBy("id DESC")
      .limit(1)
      .getOne();
    if (dataCache === undefined) {
      return [];
    }
    return this.getByIds({
      dataConfigElasticsearch,
      dataConfigImage,
      ids: JSON.parse(dataCache.result)
        .filter((value) => value.type === DataSearchType.song)
        .map((value) => value.id)
        .slice(from, from + size)
        .map((value) => value.id),
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async transform(
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    elasticSearchRes: ApiResponse<Record<string, any>, unknown>
  ): Promise<SongResDto[]> {
    return Promise.all(
      elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.song({
          ...value._source,
          imagePath: dataConfigElasticsearch.imagePath,
          imagePathDefaultSong: dataConfigElasticsearch.imagePathDefaultSong,
          mp3Endpoint: dataConfigElasticsearch.mp3Endpoint,
        })
      )
    );
  }

  constructor(
    @InjectRepository(DataCacheEntity, DATA_TYPEORM)
    private readonly dataCacheEntityRepository: DataCacheEntityRepository,
    @InjectRepository(DataSiteEntity, DATA_TYPEORM)
    private readonly dataSiteEntityRepository: DataSiteEntityRepository,
    private readonly dataTransformService: DataTransformService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async albumSongs(dto: SongAlbumReqDto): Promise<SongResDto[]> {
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
        size: dto.dataConfigElasticsearch.maxSize,
        sort: [
          {
            track: DataSortByType.asc,
          },
        ],
      },
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return this.transform(dto.dataConfigElasticsearch, elasticSearchRes);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongs(dto: SongArtistsReqDto): Promise<SongResDto[]> {
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
    return this.transform(dto.dataConfigElasticsearch, elasticSearchRes);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongsTop(dto: SongArtistSongsTopReqDto): Promise<SongResDto[]> {
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
        size: Math.min(dto.dataConfigElasticsearch.maxSize, dto.size),
        sort: [
          {
            downloads_count: DataSortByType.desc,
          },
        ],
      },
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return this.transform(dto.dataConfigElasticsearch, elasticSearchRes);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async genre(dto: SongGenreReqDto): Promise<SongResDto[]> {
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
                : {
                    terms: {
                      "genre.keyword": dto.genres,
                    },
                  },
            ],
          },
        },
        size: Math.min(dto.dataConfigElasticsearch.maxSize, dto.size),
        sort: {
          [dto.orderBy === SongOrderByType.release
            ? "release_date"
            : dto.orderBy === SongOrderByType.downloads
            ? "downloads_count"
            : ""]: DataSortByType.desc,
        },
      },
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return this.transform(dto.dataConfigElasticsearch, elasticSearchRes);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: SongGetReqDto): Promise<SongResDto> {
    const elasticSearchRes = await this.elasticsearchService.get({
      id: `song-${dto.id}`,
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return this.dataTransformService.song({
      ...elasticSearchRes.body._source,
      imagePath: dto.dataConfigElasticsearch.imagePath,
      imagePathDefaultSong: dto.dataConfigElasticsearch.imagePathDefaultSong,
      mp3Endpoint: dto.dataConfigElasticsearch.mp3Endpoint,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getByIds(dto: SongGetByIdsReqDto): Promise<SongResDto[]> {
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: {
          excludes: ["tags", "lyrics"],
        },
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
        size: dto.dataConfigElasticsearch.maxSize,
      },
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return this.transform(dto.dataConfigElasticsearch, elasticSearchRes);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async language(dto: SongLanguageReqDto): Promise<SongResDto[]> {
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
        size: Math.min(dto.dataConfigElasticsearch.maxSize, dto.size),
        sort: { [dto.orderBy]: DataSortByType.desc },
      },
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return this.transform(dto.dataConfigElasticsearch, elasticSearchRes);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(dto: SongMoodReqDto): Promise<SongResDto[]> {
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
        size: Math.min(dto.dataConfigElasticsearch.maxSize, dto.size),
        sort: {
          [`emotions.${dto.mood}`]: {
            order: DataSortByType.desc,
          },
        },
      },
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return this.transform(dto.dataConfigElasticsearch, elasticSearchRes);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newPodcast(dto: SongNewPodcastReqDto): Promise<SongResDto[]> {
    return this.query(
      dto.dataConfigElasticsearch,
      dto.dataConfigImage,
      dto.from,
      DataQueryType.podcast,
      dto.size
    );
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newSong(dto: SongNewReqDto): Promise<SongResDto[]> {
    return this.query(
      dto.dataConfigElasticsearch,
      dto.dataConfigImage,
      dto.from,
      DataQueryType.new,
      dto.size
    );
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async podcast(dto: SongPodcastReqDto): Promise<SongResDto[]> {
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
        size: Math.min(dto.dataConfigElasticsearch.maxSize, dto.size),
        sort: { [dto.orderBy]: DataSortByType.desc },
      },
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return this.transform(dto.dataConfigElasticsearch, elasticSearchRes);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async similar(dto: SongSimilarReqDto): Promise<SongResDto[]> {
    const songMoods = await this.elasticsearchService.get({
      id: `song-${dto.id}`,
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    if (songMoods.body._source.moods === undefined) {
      return [];
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
        _source: {
          excludes: ["lyrics", "tags"],
        },
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
                exists: {
                  field: "moods",
                },
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
        size: Math.min(dto.dataConfigElasticsearch.maxSize, dto.size),
        sort,
      },
      index: dto.dataConfigElasticsearch.indexName,
      type: DataSearchType.music,
    });
    return this.transform(dto.dataConfigElasticsearch, elasticSearchRes);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async slider(dto: SongSliderReqDto): Promise<SongResDto[]> {
    const songIds = await this.dataSiteEntityRepository
      .createQueryBuilder()
      .orderBy("created_at DESC")
      .getMany();
    return this.getByIds({
      ...dto,
      ids: songIds.map((value) => value.song_id),
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topDay(dto: SongTopDayReqDto): Promise<SongResDto[]> {
    return this.query(
      dto.dataConfigElasticsearch,
      dto.dataConfigImage,
      dto.from,
      DataQueryType.topDay,
      dto.size
    );
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topWeek(dto: SongTopWeekReqDto): Promise<SongResDto[]> {
    return this.query(
      dto.dataConfigElasticsearch,
      dto.dataConfigImage,
      dto.from,
      DataQueryType.topWeek,
      dto.size
    );
  }
}
