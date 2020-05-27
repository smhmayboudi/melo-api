import {
  AlbumResDto,
  ArtistResDto,
  DATA_SERVICE,
  DATA_TRANSFORM_SERVICE_ALBUM,
  DATA_TRANSFORM_SERVICE_ARTIST,
  DATA_TRANSFORM_SERVICE_SONG,
  DataElasticSearchArtistResDto,
  DataElasticSearchSearchResDto,
  DataPaginationResDto,
  DataSearchType,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { PromMethodCounter } from "@melo/prom";
import { SearchServiceInterface } from "./search.service.interface";
import lodash from "lodash";
import moment from "moment";

@Injectable()
// @PromInstanceCounter
export class SearchService implements SearchServiceInterface {
  constructor(
    @Inject(DATA_SERVICE) private readonly clientProxy: ClientProxy,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async query(
    dto: SearchQueryReqDto
  ): Promise<DataPaginationResDto<SearchResDto>> {
    const elasticSuggestRes = await this.elasticsearchService.search({
      body: {
        query: {
          match: {
            query: dto.query,
          },
        },
        size: Math.min(dto.config.maxSize, dto.size),
      },
      index: dto.config.suggestIndex,
    });
    const suggestKeys =
      elasticSuggestRes.body.hits.hits.length === 0
        ? []
        : lodash.uniqBy(
            [
              lodash.orderBy(
                lodash.groupBy(
                  elasticSuggestRes.body.hits.hits
                    .map((value) => value._source)
                    .slice(0, 10),
                  "key"
                ),
                (value) => value.length,
                "desc"
              )[0][0].key,
              lodash.orderBy(
                lodash.groupBy(
                  elasticSuggestRes.body.hits.hits.map(
                    (value) => value._source
                  ),
                  "key"
                ),
                (value) => value.length,
                "desc"
              )[0][0].key,
            ],
            (value) => value
          );
    const suggest = await this.elasticsearchService.search({
      body: {
        _source: [
          "album",
          "album_downloads_count",
          "album_id",
          "artist_full_name",
          "artist_id",
          "artist_sum_downloads_count",
          "artists",
          "copyright",
          "downloads_count",
          "duration",
          "followers_count",
          "has_cover",
          "has_video",
          "id",
          "max_audio_rate",
          "photo_id",
          "public",
          "release_date",
          "title",
          "tracks_count",
          "type",
          "unique_name",
        ],
        query: {
          terms: {
            _id: suggestKeys,
          },
        },
      },
      index: dto.config.indexName,
    });
    const fields = [
      "all.ngram",
      "all^2",
      "lyrics_search.ngram",
      "lyrics_search^2",
    ];
    const normal = await this.elasticsearchService.search({
      body: {
        _source: [
          "album",
          "album_downloads_count",
          "album_id",
          "artist_full_name",
          "artist_id",
          "artist_sum_downloads_count",
          "artists",
          "copyright",
          "downloads_count",
          "duration",
          "followers_count",
          "has_cover",
          "has_video",
          "id",
          "max_audio_rate",
          "photo_id",
          "public",
          "release_date",
          "title",
          "tracks_count",
          "type",
          "unique_name",
        ],
        from: dto.from,
        query: {
          function_score: {
            query: {
              bool: {
                must: [
                  {
                    multi_match: {
                      fields,
                      query: dto.query,
                      type: "cross_fields",
                    },
                  },
                ],
                must_not: [
                  {
                    term: {
                      public: false,
                    },
                  },
                  {
                    bool: {
                      filter: {
                        script: {
                          script: "doc['artists_ids'].length > 1",
                        },
                      },
                      must: [
                        {
                          term: {
                            "type.keyword": {
                              value: DataSearchType.artist,
                            },
                          },
                        },
                      ],
                    },
                  },
                  {
                    term: {
                      copyright: true,
                    },
                  },
                ],
                should: [
                  {
                    multi_match: {
                      boost: 5,
                      fields,
                      query: dto.query,
                      type: "phrase",
                    },
                  },
                  {
                    multi_match: {
                      boost: 2,
                      fields,
                      operator: "and",
                      query: dto.query,
                    },
                  },
                ],
              },
            },
            script_score: {
              script: dto.config.scriptScore,
            },
          },
        },
        size: Math.min(dto.config.maxSize, dto.size),
      },
      index: dto.config.indexName,
    });
    let mixed = suggest.body.hits.hits.map((value) => ({
      ...value._source,
      suggested: 1,
    }));
    normal.body.hits.hits.forEach((value) => {
      const isMixed = !mixed
        .map(
          (value2) =>
            value._source.id === value2.id && value._source.type === value2.type
        )
        .reduce(
          (previousValue: boolean, currentValue: boolean) =>
            previousValue || currentValue,
          false
        );
      if (isMixed) {
        mixed = [...mixed, value._source];
      }
    });
    if (mixed.length === 0) {
      return {
        results: [] as SearchResDto[],
        total: 0,
      } as DataPaginationResDto<SearchResDto>;
    }
    const results = ((await Promise.all(
      mixed
        .filter((value) =>
          [
            DataSearchType.album,
            DataSearchType.artist,
            DataSearchType.podcast,
            DataSearchType.song,
          ].includes(value.type)
        )
        .map(async (value) => {
          switch (value.type) {
            case DataSearchType.album: {
              const album = await this.clientProxy
                .send<AlbumResDto, DataElasticSearchSearchResDto>(
                  DATA_TRANSFORM_SERVICE_ALBUM,
                  {
                    ...dto,
                    ...value,
                  }
                )
                .toPromise();
              return {
                album,
                type: value.type,
              };
            }
            case DataSearchType.artist: {
              const artist = await this.clientProxy
                .send<ArtistResDto, DataElasticSearchArtistResDto>(
                  DATA_TRANSFORM_SERVICE_ARTIST,
                  {
                    ...dto,
                    ...value.artists[0],
                  }
                )
                .toPromise();
              return {
                artist,
                type: value.type,
              };
            }
            case DataSearchType.podcast:
            case DataSearchType.song: {
              const song = await this.clientProxy
                .send<SongResDto, DataElasticSearchSearchResDto>(
                  DATA_TRANSFORM_SERVICE_SONG,
                  {
                    ...dto,
                    ...value,
                  }
                )
                .toPromise();
              return {
                song,
                type: value.type,
              };
            }
            default:
              return {
                results: [] as SearchResDto[],
                total: 0,
              } as DataPaginationResDto<SearchResDto>;
          }
        })
    )) as any[]).map((value, index) => ({ ...value, position: index + 1 }));
    return {
      results,
      total: results.length,
    } as DataPaginationResDto<SearchResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(dto: SearchMoodReqDto): Promise<DataPaginationResDto<SongResDto>> {
    // TODO: interface ?
    const moods = [
      { classy: dto.classy },
      { energetic: dto.energetic },
      { happiness: dto.happiness },
      { romantic: dto.romantic },
    ];
    // TODO: interface ?
    let sort: any[] = Object.keys(moods).map((value) => ({
      _script: {
        order: "asc",
        script: {
          lang: "painless",
          source: `Math.abs(${moods[value]}-doc['moods.${value}'].value)`,
        },
        type: "number",
      },
    }));
    if (dto.date !== undefined) {
      const dateFilter = moment(new Date())
        .subtract(10 + 5 * dto.date, "y")
        .milliseconds();
      sort = [
        ...sort,
        {
          _script: {
            order: "asc",
            script: {
              lang: "painless",
              source: `Math.abs(${dateFilter}L-doc['release_date'].value.getMillis())`,
            },
            type: "number",
          },
        },
      ];
    }
    sort = [
      ...sort,
      {
        downloads_count: "desc",
      },
    ];
    const elasticSearchRes = await this.elasticsearchService.search({
      body: {
        _source: [
          "album_id",
          "album",
          "artist_full_name",
          "artist_id",
          "artists",
          "duration",
          "id",
          "max_audio_rate",
          "release_date",
          "title",
          "unique_name",
        ],
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
                exists: { field: "moods" },
              },
            ],
            must_not: [
              {
                term: {
                  copyright: true,
                },
              },
            ],
          },
        },
        size: Math.min(dto.config.maxSize, dto.size),
        sort,
      },
      index: dto.config.indexName,
    });
    const results = (await Promise.all(
      elasticSearchRes.body.hits.hits.map(
        async (value) =>
          await this.clientProxy
            .send<SongResDto, DataElasticSearchSearchResDto>(
              DATA_TRANSFORM_SERVICE_SONG,
              {
                ...dto,
                ...value._source,
              }
            )
            .toPromise()
      )
    )) as SongResDto[];
    return {
      results,
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<SongResDto>;
  }
}
