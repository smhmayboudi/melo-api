import {
  ALBUM_SERVICE,
  ALBUM_SERVICE_TRANSFORM,
  ARTIST_SERVICE,
  ARTIST_SERVICE_TRANSFORM,
  AlbumResDto,
  ArtistResDto,
  CONST_SERVICE,
  CONST_SERVICE_IMAGE,
  ConstImageReqDto,
  ConstImageResDto,
  RELATION_SERVICE,
  RELATION_SERVICE_GET,
  RELATION_SERVICE_REMOVE,
  RELATION_SERVICE_SET,
  RelationEdgeType,
  RelationEntityType,
  RelationGetReqDto,
  RelationRemoveReqDto,
  RelationResDto,
  RelationSetReqDto,
  SearchElasticsearchArtistResDto,
  SearchElasticsearchSearchResDto,
  SearchElasticsearchSongMoodsResDto,
  SearchQueryType,
  SearchSortByType,
  SearchType,
  SongAlbumSongsReqDto,
  SongArtistSongsReqDto,
  SongArtistSongsTopReqDto,
  SongGenreReqDto,
  SongGetByIdsReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongLikeReqDto,
  SongLikedReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongOrderByType,
  SongPodcastReqDto,
  SongResDto,
  SongSendTelegramReqDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
  SongUnlikeReqDto,
  USER_SERVICE,
  USER_SERVICE_FIND_ONE,
  UserFindOneReqDto,
  UserResDto,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  BadRequestException,
  HttpService,
  Inject,
  Injectable,
} from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { InjectRepository } from "@nestjs/typeorm";
import { PromMethodCounter } from "@melo/prom";
import { SongCacheEntity } from "./song.cache.entity";
import { SongCacheEntityRepository } from "./song.cache.entity.repository";
import { SongConfigService } from "./song.config.service";
import { SongServiceInterface } from "./song.service.interface";
import { SongSiteEntity } from "./song.site.entity";
import { SongSiteEntityRepository } from "./song.site.entity.repository";
import lodash from "lodash";
import { map } from "rxjs/operators";

@Injectable()
// @PromInstanceCounter
export class SongService implements SongServiceInterface {
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async query(dto: {
    from: number;
    query: SearchQueryType;
    size: number;
  }): Promise<SongResDto[]> {
    const songCache = await this.songCacheEntityRepository
      .createQueryBuilder()
      .where({
        name: dto.query,
      })
      .orderBy("id DESC")
      .limit(1)
      .getOne();
    if (songCache === undefined) {
      return [];
    }
    return this.getByIds({
      ids: JSON.parse(songCache.result)
        .filter((value) => value.type === SearchType.song)
        .map((value) => value.id)
        .slice(dto.from, dto.from + dto.size)
        .map((value) => value.id),
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async transformLocal(
    elasticsearchSearch: { _source: SearchElasticsearchSearchResDto }[]
  ): Promise<SongResDto[]> {
    return Promise.all(
      elasticsearchSearch.map((value) => this.transform(value._source))
    );
  }

  constructor(
    @Inject(ALBUM_SERVICE) private readonly albumClientProxy: ClientProxy,
    @Inject(ARTIST_SERVICE) private readonly artistClientProxy: ClientProxy,
    @Inject(CONST_SERVICE) private readonly constClientProxy: ClientProxy,
    @Inject(RELATION_SERVICE) private readonly relationClientProxy: ClientProxy,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly httpService: HttpService,
    @InjectRepository(SongCacheEntity)
    private readonly songCacheEntityRepository: SongCacheEntityRepository,
    private readonly songConfigService: SongConfigService,
    @InjectRepository(SongSiteEntity)
    private readonly songSiteEntityRepository: SongSiteEntityRepository,
    @Inject(USER_SERVICE) private readonly userClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async albumSongs(dto: SongAlbumSongsReqDto): Promise<SongResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        from: 0,
        query: {
          bool: {
            must: [
              {
                match: {
                  type: SearchType.song,
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
        size: this.songConfigService.maxSize,
        sort: [
          {
            track: SearchSortByType.asc,
          },
        ],
      },
      index: this.songConfigService.indexName,
      type: SearchType.music,
    });
    return this.transformLocal(elasticsearchSearch.body.hits.hits);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongs(dto: SongArtistSongsReqDto): Promise<SongResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                term: {
                  type: SearchType.song,
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
        size: Math.min(this.songConfigService.maxSize, dto.size),
        sort: [
          {
            release_date: SearchSortByType.desc,
          },
        ],
      },
      index: this.songConfigService.indexName,
      type: SearchType.music,
    });
    return this.transformLocal(elasticsearchSearch.body.hits.hits);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongsTop(dto: SongArtistSongsTopReqDto): Promise<SongResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                term: {
                  type: SearchType.song,
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
        size: Math.min(this.songConfigService.maxSize, dto.size),
        sort: [
          {
            downloads_count: SearchSortByType.desc,
          },
        ],
      },
      index: this.songConfigService.indexName,
      type: SearchType.music,
    });
    return this.transformLocal(elasticsearchSearch.body.hits.hits);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async genre(dto: SongGenreReqDto): Promise<SongResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                terms: {
                  "type.keyword": [SearchType.song],
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
        size: Math.min(this.songConfigService.maxSize, dto.size),
        sort: {
          [dto.orderBy === SongOrderByType.release
            ? "release_date"
            : "downloads_count"]: SearchSortByType.desc,
        },
      },
      index: this.songConfigService.indexName,
      type: SearchType.music,
    });
    return this.transformLocal(elasticsearchSearch.body.hits.hits);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: SongGetReqDto): Promise<SongResDto> {
    const elasticsearchGet = await this.elasticsearchService.get<
      Record<string, SearchElasticsearchSearchResDto>,
      any
    >({
      id: `song-${dto.id}`,
      index: this.songConfigService.indexName,
      type: SearchType.music,
    });
    return (
      await this.transformLocal([
        {
          _source: elasticsearchGet.body._source,
        },
      ])
    )[0];
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getByIds(dto: SongGetByIdsReqDto): Promise<SongResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        _source: {
          excludes: ["tags", "lyrics"],
        },
        query: {
          bool: {
            must: [
              {
                terms: {
                  "type.keyword": [SearchType.podcast, SearchType.song],
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
        size: this.songConfigService.maxSize,
      },
      index: this.songConfigService.indexName,
      type: SearchType.music,
    });
    return this.transformLocal(elasticsearchSearch.body.hits.hits);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async language(dto: SongLanguageReqDto): Promise<SongResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                terms: {
                  "type.keyword": [SearchType.song],
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
        size: Math.min(this.songConfigService.maxSize, dto.size),
        sort: { [dto.orderBy]: SearchSortByType.desc },
      },
      index: this.songConfigService.indexName,
      type: SearchType.music,
    });
    return this.transformLocal(elasticsearchSearch.body.hits.hits);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async like(dto: SongLikeReqDto): Promise<SongResDto> {
    await this.relationClientProxy
      .send<RelationResDto, RelationSetReqDto>(RELATION_SERVICE_SET, {
        createdAt: new Date(),
        from: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        to: {
          id: dto.id,
          type: RelationEntityType.song,
        },
        type: RelationEdgeType.likedSongs,
      })
      .toPromise();
    const song = await this.get(dto);
    return {
      ...song,
      liked: true,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async liked(dto: SongLikedReqDto): Promise<SongResDto[]> {
    const relations = await this.relationClientProxy
      .send<RelationResDto[], RelationGetReqDto>(RELATION_SERVICE_GET, {
        entity: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        from: dto.from,
        size: Math.min(this.songConfigService.maxSize, dto.size),
        type: RelationEdgeType.likedSongs,
      })
      .toPromise();
    if (relations.length === 0) {
      return [];
    }
    return this.getByIds({
      ...dto,
      ids: relations.map((value) => value.to.id),
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(dto: SongMoodReqDto): Promise<SongResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                terms: {
                  "type.keyword": [SearchType.song],
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
        size: Math.min(this.songConfigService.maxSize, dto.size),
        sort: {
          [`emotions.${dto.mood}`]: {
            order: SearchSortByType.desc,
          },
        },
      },
      index: this.songConfigService.indexName,
      type: SearchType.music,
    });
    return this.transformLocal(elasticsearchSearch.body.hits.hits);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newPodcast(dto: SongNewPodcastReqDto): Promise<SongResDto[]> {
    return this.query({
      ...dto,
      from: dto.from,
      query: SearchQueryType.podcast,
      size: dto.size,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newSong(dto: SongNewReqDto): Promise<SongResDto[]> {
    return this.query({
      ...dto,
      from: dto.from,
      query: SearchQueryType.new,
      size: dto.size,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async podcast(dto: SongPodcastReqDto): Promise<SongResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        from: dto.from,
        query: {
          bool: {
            must: [
              {
                terms: {
                  "type.keyword": [SearchType.podcast],
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
        size: Math.min(this.songConfigService.maxSize, dto.size),
        sort: { [dto.orderBy]: SearchSortByType.desc },
      },
      index: this.songConfigService.indexName,
      type: SearchType.music,
    });
    return this.transformLocal(elasticsearchSearch.body.hits.hits);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async sendTelegram(dto: SongSendTelegramReqDto): Promise<void> {
    const user = await this.userClientProxy
      .send<UserResDto | undefined, UserFindOneReqDto>(USER_SERVICE_FIND_ONE, {
        id: dto.sub,
      })
      .toPromise();
    if (user === undefined || user.telegram_id === undefined) {
      throw new BadRequestException();
    }
    await this.httpService
      .post<number>(this.songConfigService.sendUrl, {
        callback_query: {
          data: `1:${dto.id},high,0`,
          from: {
            first_name: "",
            id: user.telegram_id,
            is_bot: false,
            language_code: "fa",
            user,
          },
          message: {
            chat: {
              first_name: "",
              id: user.telegram_id,
              type: "private",
              user,
            },
            date: Math.round(new Date().getTime() / 1000),
          },
        },
        update_id: 0,
      })
      .pipe(map((value) => value.data))
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async similar(dto: SongSimilarReqDto): Promise<SongResDto[]> {
    const elasticsearchGet = await this.elasticsearchService.get<
      Record<string, { moods?: SearchElasticsearchSongMoodsResDto }>,
      any
    >({
      id: `song-${dto.id}`,
      index: this.songConfigService.indexName,
      type: SearchType.music,
    });
    if (elasticsearchGet.body._source.moods === undefined) {
      return [];
    }
    // TODO: interface ?
    const moods = [
      { classy: elasticsearchGet["classy"] },
      { energetic: elasticsearchGet["energetic"] },
      { happiness: elasticsearchGet["happiness"] },
      { romantic: elasticsearchGet["romantic"] },
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
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
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
                    value: SearchType.song,
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
        size: Math.min(this.songConfigService.maxSize, dto.size),
        sort,
      },
      index: this.songConfigService.indexName,
      type: SearchType.music,
    });
    return this.transformLocal(elasticsearchSearch.body.hits.hits);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async slider(dto: SongSliderReqDto): Promise<SongResDto[]> {
    const songIds = await this.songSiteEntityRepository
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
    return this.query({
      ...dto,
      from: dto.from,
      query: SearchQueryType.topDay,
      size: dto.size,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topWeek(dto: SongTopWeekReqDto): Promise<SongResDto[]> {
    return this.query({
      ...dto,
      from: dto.from,
      query: SearchQueryType.topWeek,
      size: dto.size,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async transform(dto: SearchElasticsearchSearchResDto): Promise<SongResDto> {
    const album = await this.albumClientProxy
      .send<AlbumResDto, SearchElasticsearchSearchResDto>(
        ALBUM_SERVICE_TRANSFORM,
        dto
      )
      .toPromise();
    const artists = await Promise.all(
      dto.artists.map(
        async (value) =>
          await this.artistClientProxy
            .send<ArtistResDto, SearchElasticsearchArtistResDto>(
              ARTIST_SERVICE_TRANSFORM,
              value
            )
            .toPromise()
      )
    );
    const audio =
      dto.max_audio_rate > 128
        ? {
            high: {
              fingerprint: "",
              url: `${this.songConfigService.mp3Endpoint}${dto.unique_name}-${dto.max_audio_rate}.mp3`,
            },
            medium: {
              fingerprint: "",
              url: `${this.songConfigService.mp3Endpoint}${dto.unique_name}-128.mp3`,
            },
          }
        : {
            medium: {
              fingerprint: "",
              url: `${this.songConfigService.mp3Endpoint}${dto.unique_name}-${dto.max_audio_rate}.mp3`,
            },
          };
    const uri =
      !dto.has_cover || dto.unique_name === undefined
        ? this.songConfigService.imagePathDefaultSong
        : lodash.template(this.songConfigService.imagePath)({
            id: dto.unique_name,
          });
    const image = await this.constClientProxy
      .send<ConstImageResDto, ConstImageReqDto>(CONST_SERVICE_IMAGE, {
        ...dto,
        uri,
      })
      .toPromise();
    const localized =
      dto.localize === undefined ? false : dto.localize === true ? true : false;
    const tags =
      dto.tags === undefined ? undefined : dto.tags.map((value) => value.tag);
    return {
      album,
      artists,
      audio,
      copyrighted: dto.copyright,
      downloadCount: dto.downloads_count,
      duration: dto.duration,
      hasVideo: dto.has_video,
      id: dto.id,
      image,
      localized,
      lyrics: dto.lyrics,
      releaseDate: dto.release_date,
      tags,
      title: dto.title === undefined ? "" : dto.title,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unlike(dto: SongUnlikeReqDto): Promise<SongResDto> {
    await this.relationClientProxy
      .send<RelationResDto, RelationRemoveReqDto>(RELATION_SERVICE_REMOVE, {
        from: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        to: {
          id: dto.id,
          type: RelationEntityType.song,
        },
        type: RelationEdgeType.likedSongs,
      })
      .toPromise();
    const song = await this.get(dto);
    return {
      ...song,
      liked: false,
    };
  }
}
