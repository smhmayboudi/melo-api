import {
  ARTIST_SERVICE,
  ARTIST_SERVICE_TRANSFORM,
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  ArtistResDto,
  CONST_SERVICE,
  CONST_SERVICE_IMAGE,
  ConstImageReqDto,
  ConstImageResDto,
  SONG_SERVICE,
  SONG_SERVICE_ALBUM_SONGS,
  SearchElasticsearchArtistResDto,
  SearchElasticsearchSearchResDto,
  SearchSortByType,
  SearchType,
  SongAlbumSongsReqDto,
  SongResDto,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";

import { AlbumConfigService } from "./album.config.service";
import { AlbumServiceInterface } from "./album.service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { PromMethodCounter } from "@melo/prom";
import lodash from "lodash";

@Injectable()
// @PromInstanceCounter
export class AlbumService implements AlbumServiceInterface {
  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async transformLocal(
    elasticSearchRes: { _source: SearchElasticsearchSearchResDto }[]
  ): Promise<AlbumResDto[]> {
    return Promise.all(
      elasticSearchRes.map((value) => this.transform(value._source))
    );
  }

  constructor(
    @Inject(ARTIST_SERVICE) private readonly artistClientProxy: ClientProxy,
    @Inject(CONST_SERVICE) private readonly constClientProxy: ClientProxy,
    @Inject(SONG_SERVICE) private readonly songClientProxy: ClientProxy,
    private readonly albumConfigService: AlbumConfigService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async albums(dto: AlbumArtistsReqDto): Promise<AlbumResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
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
                  type: SearchType.album,
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
        size: Math.min(this.albumConfigService.maxSize, dto.size),
        sort: [
          {
            release_date: SearchSortByType.desc,
          },
        ],
      },
      index: this.albumConfigService.indexName,
      type: SearchType.music,
    });
    return this.transformLocal(elasticsearchSearch.body.hits.hits);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: AlbumGetReqDto): Promise<AlbumResDto> {
    const elasticsearchGet = await this.elasticsearchService.get<
      Record<string, SearchElasticsearchSearchResDto>,
      any
    >({
      id: `album-${dto.id}`,
      index: this.albumConfigService.indexName,
      type: SearchType.music,
    });
    const album = await this.transform(elasticsearchGet.body._source);
    const songs = await this.songClientProxy
      .send<SongResDto[], SongAlbumSongsReqDto>(SONG_SERVICE_ALBUM_SONGS, dto)
      .toPromise();
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
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
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
                  "type.keyword": SearchType.album,
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
        size: Math.min(this.albumConfigService.maxSize, dto.size),
        sort: [
          {
            release_date: SearchSortByType.desc,
          },
        ],
      },
      index: this.albumConfigService.indexName,
      type: SearchType.music,
    });
    return this.transformLocal(elasticsearchSearch.body.hits.hits);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async transform(dto: SearchElasticsearchSearchResDto): Promise<AlbumResDto> {
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
    const uri =
      dto.unique_name === undefined
        ? this.albumConfigService.imagePathDefaultAlbum
        : lodash.template(this.albumConfigService.imagePath)({
            id: dto.unique_name,
          });
    const image = await this.constClientProxy
      .send<ConstImageResDto, ConstImageReqDto>(CONST_SERVICE_IMAGE, {
        ...dto,
        uri,
      })
      .toPromise();
    const tags =
      dto.tags === undefined ? undefined : dto.tags.map((value) => value.tag);
    return {
      artists,
      downloadCount: dto.album_downloads_count,
      id: dto.album_id,
      image,
      name: dto.album,
      releaseDate: dto.release_date,
      tags,
      tracksCount: dto.album_tracks_count,
    };
  }
}
