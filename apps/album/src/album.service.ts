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
  DataConfigElasticsearchReqDto,
  DataElasticsearchArtistResDto,
  DataElasticsearchSearchResDto,
  DataSearchType,
  DataSortByType,
  SONG_SERVICE,
  SONG_SERVICE_ALBUM_SONGS,
  SongAlbumSongsReqDto,
  SongResDto,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";

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
    dataConfigElasticsearch: DataConfigElasticsearchReqDto,
    elasticSearchRes: { _source: DataElasticsearchSearchResDto }[]
  ): Promise<AlbumResDto[]> {
    return Promise.all(
      elasticSearchRes.map((value) =>
        this.transform({
          ...value._source,
          dataConfigElasticsearch,
        })
      )
    );
  }

  constructor(
    @Inject(ARTIST_SERVICE) private readonly artistClientProxy: ClientProxy,
    @Inject(CONST_SERVICE) private readonly constClientProxy: ClientProxy,
    @Inject(SONG_SERVICE) private readonly songClientProxy: ClientProxy,
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
    return this.transformLocal(
      dto.dataConfigElasticsearch,
      elasticsearchSearch.body.hits.hits
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
    const album = await this.transform({
      ...elasticsearchGet.body._source,
      dataConfigElasticsearch: dto.dataConfigElasticsearch,
      dataConfigImage: dto.dataConfigImage,
    });
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
    return this.transformLocal(
      dto.dataConfigElasticsearch,
      elasticsearchSearch.body.hits.hits
    );
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async transform(dto: DataElasticsearchSearchResDto): Promise<AlbumResDto> {
    const artists = await Promise.all(
      dto.artists.map(
        async (value) =>
          await this.artistClientProxy
            .send<ArtistResDto, DataElasticsearchArtistResDto>(
              ARTIST_SERVICE_TRANSFORM,
              value
            )
            .toPromise()
      )
    );
    const uri =
      dto.unique_name === undefined
        ? dto.dataConfigElasticsearch.imagePathDefaultAlbum
        : lodash.template(dto.dataConfigElasticsearch.imagePath)({
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
