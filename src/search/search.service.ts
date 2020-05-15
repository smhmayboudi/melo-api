import * as _ from "lodash";

import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";

import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchType } from "../data/data.search.type";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { DataTransformService } from "../data/data.transform.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";
import { SearchConfigService } from "./search.config.service";
import { SearchMoodParamDto } from "./dto/req/search.mood.param.req.dto";
import { SearchMoodQueryDto } from "./dto/req/search.mood.query.req.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchServiceInterface } from "./search.service.interface";
import moment from "moment";

@Injectable()
// @PromInstanceCounter
export class SearchService implements SearchServiceInterface {
  constructor(
    private readonly dataTransformService: DataTransformService,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly searchConfigService: SearchConfigService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async query(
    dto: SearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchResDto>> {
    const elasticSuggestRes = await this.elasticsearchService.search({
      body: {
        query: {
          match: {
            query: dto.query,
          },
        },
        size: Math.min(dto.size, this.searchConfigService.resultSize),
      },
      index: this.searchConfigService.suggestIndex,
    });
    const suggestKeys =
      elasticSuggestRes.body.hits.hits.length === 0
        ? []
        : _.uniqBy(
            [
              _.orderBy(
                _.groupBy(
                  elasticSuggestRes.body.hits.hits
                    .map((value) => value._source)
                    .slice(0, 10),
                  "key"
                ),
                (value) => value.length,
                "desc"
              )[0][0].key,
              _.orderBy(
                _.groupBy(
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
      index: this.searchConfigService.index,
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
              script: this.searchConfigService.elasticScriptScore,
            },
          },
        },
        size: Math.min(dto.size, this.searchConfigService.resultSize),
      },
      index: this.searchConfigService.index,
    });
    let mixed = suggest.body.hits.hits.map((value) => ({
      ...value._source,
      suggested: 1,
    }));
    normal.body.hits.hits.forEach((value) => {
      if (
        !mixed
          .map(
            (value2) =>
              value._source.id === value2.id &&
              value._source.type === value2.type
          )
          .reduce(
            (previousValue: boolean, currentValue: boolean) =>
              previousValue || currentValue,
            false
          )
      ) {
        mixed = [...mixed, value._source];
      }
    });
    if (mixed.length === 0) {
      return {
        results: [] as DataSearchResDto[],
        total: 0,
      } as DataPaginationResDto<DataSearchResDto>;
    }
    const results = mixed
      .filter((value) =>
        [
          DataSearchType.album,
          DataSearchType.artist,
          DataSearchType.podcast,
          DataSearchType.song,
        ].includes(value.type)
      )
      .map((value) => {
        switch (value.type) {
          case DataSearchType.album:
            return {
              album: this.dataTransformService.transformAlbum(value),
              type: value.type,
            };
          case DataSearchType.artist:
            return {
              artist: this.dataTransformService.transformArtist(
                value.artists[0]
              ),
              type: value.type,
            };
          case DataSearchType.podcast:
          case DataSearchType.song:
            return {
              song: this.dataTransformService.transformSong(value),
              type: value.type,
            };
          default:
            return {
              results: [] as DataSearchResDto[],
              total: 0,
            } as DataPaginationResDto<DataSearchResDto>;
        }
      })
      .map((value, index) => ({ ...value, position: index + 1 }));
    return {
      results,
      total: results.length,
    } as DataPaginationResDto<DataSearchResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(
    paramDto: SearchMoodParamDto,
    queryDto: SearchMoodQueryDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    // TODO: interface ?
    const moods = [
      { classy: queryDto.classy },
      { energetic: queryDto.energetic },
      { happiness: queryDto.happiness },
      { romantic: queryDto.romantic },
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
    if (queryDto.date !== undefined) {
      const dateFilter = moment(new Date())
        .subtract(10 + 5 * queryDto.date, "y")
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
        from: paramDto.from,
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
        size: Math.min(paramDto.size, this.searchConfigService.resultSize),
        sort,
      },
      index: this.searchConfigService.index,
    });
    return {
      results: elasticSearchRes.body.hits.hits.map((value) =>
        this.dataTransformService.transformSong(value._source)
      ),
      total: elasticSearchRes.body.hits.hits.length,
    } as DataPaginationResDto<DataSongResDto>;
  }
}
