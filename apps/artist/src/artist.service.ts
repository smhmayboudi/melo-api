import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
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
  SearchType,
} from "@melo/common";
import { Inject, Injectable } from "@nestjs/common";

import { ArtistConfigService } from "./artist.config.service";
import { ArtistServiceInterface } from "./artist.service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { PromMethodCounter } from "@melo/prom";
import lodash from "lodash";

@Injectable()
// @PromInstanceCounter
export class ArtistService implements ArtistServiceInterface {
  constructor(
    @Inject(CONST_SERVICE) private readonly constClientProxy: ClientProxy,
    @Inject(RELATION_SERVICE) private readonly relationClientProxy: ClientProxy,
    private readonly artistConfigService: ArtistConfigService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async follow(dto: ArtistFollowReqDto): Promise<ArtistResDto> {
    await this.relationClientProxy
      .send<RelationResDto, RelationSetReqDto>(RELATION_SERVICE_SET, {
        createdAt: new Date(),
        from: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        to: {
          id: dto.id,
          type: RelationEntityType.artist,
        },
        type: RelationEdgeType.follows,
      })
      .toPromise();
    const artist = await this.get(dto);
    return {
      ...artist,
      followersCount: artist.followersCount + 1,
      following: true,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async following(dto: ArtistFollowingReqDto): Promise<ArtistResDto[]> {
    const relations = await this.relationClientProxy
      .send<RelationResDto[], RelationGetReqDto>(RELATION_SERVICE_GET, {
        entity: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        from: dto.from,
        size: Math.min(this.artistConfigService.maxSize, dto.size),
        type: RelationEdgeType.follows,
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
  async get(dto: ArtistGetReqDto): Promise<ArtistResDto> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchArtistResDto }[] }>,
      any
    >({
      body: {
        _source: {
          excludes: ["tags"],
        },
        from: 0,
        query: {
          bool: {
            must: [
              {
                match: {
                  type: SearchType.artist,
                },
              },
              {
                terms: {
                  id: [dto.id],
                },
              },
            ],
          },
        },
        size: 1,
      },
      index: this.artistConfigService.indexName,
      type: SearchType.music,
    });
    return this.transform(elasticsearchSearch.body.hits.hits[0]._source);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getByIds(dto: ArtistGetByIdsReqDto): Promise<ArtistResDto[]> {
    const elasticsearchSearch = await this.elasticsearchService.search<
      Record<string, { hits: { _source: SearchElasticsearchSearchResDto }[] }>,
      any
    >({
      body: {
        _source: {
          excludes: ["tags"],
        },
        query: {
          bool: {
            must: [
              {
                match: {
                  type: SearchType.artist,
                },
              },
              {
                terms: {
                  id: dto.ids,
                },
              },
            ],
          },
        },
        size: this.artistConfigService.maxSize,
      },
      index: this.artistConfigService.indexName,
      type: SearchType.music,
    });
    return Promise.all(
      elasticsearchSearch.body.hits.hits.map((value) =>
        this.transform(value._source.artists[0])
      )
    );
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async profile(dto: ArtistGetReqDto): Promise<ArtistResDto> {
    return this.get(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async transform(dto: SearchElasticsearchArtistResDto): Promise<ArtistResDto> {
    const uri = !dto.has_cover
      ? this.artistConfigService.imagePathDefaultArtist
      : lodash.template(this.artistConfigService.imagePath)({
          id: `artist-${dto.full_name
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/-&-/g, "-")}`,
        });
    const image = await this.constClientProxy
      .send<ConstImageResDto, ConstImageReqDto>(CONST_SERVICE_IMAGE, {
        ...dto,
        uri,
      })
      .toPromise();
    const sumSongsDownloadsCount =
      dto.sum_downloads_count > 0 ? dto.sum_downloads_count : undefined;
    const tags =
      dto.tags === undefined ? undefined : dto.tags.map((value) => value.tag);
    return {
      followersCount: dto.followers_count,
      fullName: dto.full_name,
      id: dto.id,
      image,
      sumSongsDownloadsCount,
      tags,
      type: dto.type,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trending(dto: ArtistTrendingReqDto): Promise<ArtistResDto[]> {
    return this.getByIds({
      ...dto,
      ids: [498],
    }); //189978
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trendingGenre(dto: ArtistTrendingGenreReqDto): Promise<ArtistResDto[]> {
    return this.getByIds({
      ...dto,
      ids: [498],
    }); //189978
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unfollow(dto: ArtistUnfollowReqDto): Promise<ArtistResDto> {
    await this.relationClientProxy
      .send<RelationResDto, RelationRemoveReqDto>(RELATION_SERVICE_REMOVE, {
        from: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        to: {
          id: dto.id,
          type: RelationEntityType.artist,
        },
        type: RelationEdgeType.follows,
      })
      .toPromise();
    return this.get(dto);
  }
}
