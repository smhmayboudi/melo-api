import { Injectable } from "@nestjs/common";
import { DataArtistService } from "../data/data.artist.service";
import { RelationService } from "../relation/relation.service";
import { RelationEntityType } from "../relation/type/relation.entity.type";
// import { RelationMultiHasDto } from "../relation/dto/relaton.multi.has.dto";
import { RelationType } from "../relation/type/relation.type";
import { ArtistAlbumsReqDto } from "./dto/req/artist.albums.req.dto";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistSongsTopReqDto } from "./dto/req/artist.songs-top.req.dto";
import { ArtistSongsReqDto } from "./dto/req/artist.songs.req.dto";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";
import { ArtistAlbumResDto } from "./dto/res/artist.album.res.dto";
import { ArtistArtistResDto } from "./dto/res/artist.artist.res.dto";
import { ArtistPaginationResDto } from "./dto/res/artist.pagination.res.dto";
import { ArtistSongResDto } from "./dto/res/artist.song.res.dto";

@Injectable()
export class ArtistService {
  constructor(
    private readonly dataArtistService: DataArtistService,
    private readonly relationService: RelationService
  ) {}

  async albums(
    dto: ArtistAlbumsReqDto,
    id: number
  ): Promise<ArtistPaginationResDto<ArtistAlbumResDto>> {
    return (this.dataArtistService.albums({
      ...dto,
      id
    }) as unknown) as Promise<ArtistPaginationResDto<ArtistAlbumResDto>>;
  }

  // TODO: mixArtists
  async byId(dto: ArtistByIdReqDto, id: number): Promise<ArtistArtistResDto> {
    // const artistDto = await this.dataArtistService.byId(id);
    // const entityMultiHasDto = await this.relationService.multiHas({
    //   fromEntityDto: {
    //     // TODO: remove key
    //     key: "",
    //     id: sub,
    //     type: RelationEntityType.user
    //   },
    //   toEntityDtos: [
    //     {
    //       // TODO: remove key
    //       key: "",
    //       id,
    //       type: RelationEntityType.artist
    //     }
    //   ],
    //   relType: RelationType.follows
    // } as RelationMultiHasDto);
    // artistDto.follownig = entityMultiHasDto !== undefined;
    // return artistDto;
    return (this.dataArtistService.byId({ ...dto, id }) as unknown) as Promise<
      ArtistArtistResDto
    >;
  }

  // TODO: mixArtists
  async follow(
    dto: ArtistFollowReqDto,
    id: number,
    sub: number
  ): Promise<boolean> {
    // There is no need to mixArtists instead
    // artistDto.follownig = true;
    const artist = await this.dataArtistService.byId({ ...dto, id });
    return this.relationService.set({
      createdAt: new Date(),
      entityDto1: {
        // TODO: remove key
        key: "",
        id: sub,
        type: RelationEntityType.user
      },
      entityDto2: {
        // TODO: remove key
        key: "",
        id: artist.id,
        type: RelationEntityType.artist
      },
      relType: RelationType.follows
    });
  }

  async following(
    dto: ArtistFollowingReqDto,
    id: number
  ): Promise<ArtistPaginationResDto<ArtistArtistResDto>> {
    const relates = await this.relationService.get({
      from: dto.from,
      fromEntityDto: {
        id,
        // TODO: remove key
        key: "",
        type: RelationEntityType.following
      },
      limit: dto.limit,
      relType: RelationType.follows
    });
    return (this.dataArtistService.byIds({
      ids: relates.results.map(value => value.id)
    }) as unknown) as ArtistPaginationResDto<ArtistArtistResDto>;
  }

  // TODO: mixSongs
  async songs(
    dto: ArtistSongsReqDto,
    id: number
  ): Promise<ArtistPaginationResDto<ArtistSongResDto>> {
    return (this.dataArtistService.songs({
      ...dto,
      id
    }) as unknown) as Promise<ArtistPaginationResDto<ArtistSongResDto>>;
  }

  // TODO: mixSongs
  async songsTop(
    dto: ArtistSongsTopReqDto,
    id: number
  ): Promise<ArtistPaginationResDto<ArtistSongResDto>> {
    return (this.dataArtistService.songsTop({
      ...dto,
      id
    }) as unknown) as Promise<ArtistPaginationResDto<ArtistSongResDto>>;
  }

  // TODO: mixArtists
  async trending(): Promise<ArtistPaginationResDto<ArtistArtistResDto>> {
    return (this.dataArtistService.trending() as unknown) as Promise<
      ArtistPaginationResDto<ArtistArtistResDto>
    >;
  }

  // TODO: mixArtists
  async trendingGenre(
    dto: ArtistTrendingGenreReqDto
  ): Promise<ArtistPaginationResDto<ArtistArtistResDto>> {
    return (this.dataArtistService.trendingGenre({
      ...dto
    }) as unknown) as Promise<ArtistPaginationResDto<ArtistArtistResDto>>;
  }

  async unfollow(
    _dto: ArtistUnfollowReqDto,
    id: number,
    sub: number
  ): Promise<boolean> {
    return this.relationService.remove({
      entityDto1: {
        // TODO: remove key
        key: "",
        id: sub,
        type: RelationEntityType.user
      },
      entityDto2: {
        // TODO: remove key
        key: "",
        id,
        type: RelationEntityType.artist
      },
      relType: RelationType.unfollows
    });
  }
}
