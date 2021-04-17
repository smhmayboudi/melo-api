import {
  ALBUM_SERVICE,
  ALBUM_SERVICE_TRANSFORM,
  ARTIST_SERVICE,
  ARTIST_SERVICE_TRANSFORM,
  AlbumResDto,
  ArtistResDto,
  SONG_SERVICE,
  SONG_SERVICE_TRANSFORM,
  SearchElasticsearchArtistResDto,
  SearchElasticsearchSearchResDto,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SearchType,
  SongResDto,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { PromMethodCounter } from "@melo/prom";
import { SearchConfigService } from "./search.config.service";
import { SearchServiceInterface } from "./search.service.interface";
import lodash from "lodash";
import moment from "moment";

@Injectable()
// @PromInstanceCounter
export class SearchService implements SearchServiceInterface {
  constructor(
    @Inject(ALBUM_SERVICE) private readonly albumClientProxy: ClientProxy,
    @Inject(ARTIST_SERVICE) private readonly artistClientProxy: ClientProxy,
    @Inject(SONG_SERVICE) private readonly songClientProxy: ClientProxy,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly searchConfigService: SearchConfigService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async query(dto: SearchQueryReqDto): Promise<SearchResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        query: {
          match: {
            query: dto.query,
          },
        },
        size: Math.min(this.searchConfigService.maxSize, dto.size),
      },
      index: this.searchConfigService.suggestIndex,
    });
    const suggestKeys =
      elasticsearchSearch.body.hits.hits.length === 0
        ? []
        : lodash.uniqBy(
            [
              lodash.orderBy(
                lodash.groupBy(
                  elasticsearchSearch.body.hits.hits
                    .map((value) => value._source)
                    .slice(0, 10),
                  "key"
                ),
                (value) => value.length,
                "desc"
              )[0][0].key,
              lodash.orderBy(
                lodash.groupBy(
                  elasticsearchSearch.body.hits.hits.map(
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
    const elasticsearchSearchSuggest = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
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
      index: this.searchConfigService.indexName,
    });
    const fields = [
      "all.ngram",
      "all^2",
      "lyrics_search.ngram",
      "lyrics_search^2",
    ];
    const elasticsearchSearchNormal = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
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
                              value: SearchType.artist,
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
              script: this.searchConfigService.scriptScore,
            },
          },
        },
        size: Math.min(this.searchConfigService.maxSize, dto.size),
      },
      index: this.searchConfigService.indexName,
    });
    let mixed = elasticsearchSearchSuggest.body.hits.hits.map((value) => ({
      ...value._source,
      suggested: 1,
    })) as SearchElasticsearchSearchResDto[];
    elasticsearchSearchNormal.body.hits.hits.forEach((value) => {
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
      return [];
    }
    return ((await Promise.all(
      mixed
        .filter((value) =>
          [
            SearchType.album,
            SearchType.artist,
            SearchType.podcast,
            SearchType.song,
          ].includes(value.type)
        )
        .map(async (value) => {
          switch (value.type) {
            case SearchType.album: {
              const album = await this.albumClientProxy
                .send<AlbumResDto, SearchElasticsearchSearchResDto>(
                  ALBUM_SERVICE_TRANSFORM,
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
            case SearchType.artist: {
              const artist = await this.artistClientProxy
                .send<ArtistResDto, SearchElasticsearchArtistResDto>(
                  ARTIST_SERVICE_TRANSFORM,
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
            default: {
              const song = await this.songClientProxy
                .send<SongResDto, SearchElasticsearchSearchResDto>(
                  SONG_SERVICE_TRANSFORM,
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
          }
        })
    )) as any[]).map((value, index) => ({
      ...value,
      position: index + 1,
    }));
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(dto: SearchMoodReqDto): Promise<SongResDto[]> {
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
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
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
                    value: SearchType.song,
                  },
                },
              },
              {
                exists: {
                  field: "moods",
                },
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
        size: Math.min(this.searchConfigService.maxSize, dto.size),
        sort,
      },
      index: this.searchConfigService.indexName,
    });
    return Promise.all(
      elasticsearchSearch.body.hits.hits.map((value) =>
        this.songClientProxy
          .send<SongResDto, SearchElasticsearchSearchResDto>(
            SONG_SERVICE_TRANSFORM,
            {
              ...dto,
              ...value._source,
            }
          )
          .toPromise()
      )
    );
  }
}
