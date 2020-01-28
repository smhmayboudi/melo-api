import { Injectable } from "@nestjs/common";
import { DataArtistService } from "../data/data.artist.service";
import { AlbumDto } from "../data/dto/album.dto";
import { ArtistDto } from "../data/dto/artist.dto";
import { DataArtistAlbumsDto } from "../data/dto/data.artist.albums.dto";
import { DataArtistByIdDto } from "../data/dto/data.artist.by.id.dto";
import { DataArtistSongsDto } from "../data/dto/data.artist.songs.dto";
import { DataArtistSongsTopDto } from "../data/dto/data.artist.songs.top.dto";
import { DataArtistTrendingDto } from "../data/dto/data.artist.trending.dto";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { SongDto } from "../data/dto/song.dto";
import { RelationService } from "../relation/relation.service";
import { RelationEntityType } from "../relation/type/relation.entity.type";
import { RelationType } from "../relation/type/relation.type";
import { ArtistFollowingDto } from "./dto/artist.following.dto";
import { ArtistTrendingGenreDto } from "./dto/artist.trending.genre.dto";
import { ArtistUnfollowDto } from "./dto/artist.unfollow.dto";

@Injectable()
export class ArtistService {
  constructor(
    private readonly dataArtistService: DataArtistService,
    private readonly relationService: RelationService
  ) {}

  async albums(
    dto: DataArtistAlbumsDto
  ): Promise<PaginationResultDto<AlbumDto>> {
    return this.dataArtistService.albums(dto);
  }

  // TODO: mixArtists
  async byId(dto: DataArtistByIdDto): Promise<ArtistDto> {
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
    return this.dataArtistService.byId(dto);
  }

  // TODO: mixArtists
  async follow(id: number, sub: number): Promise<boolean> {
    // There is no need to mixArtists instead
    // artistDto.follownig = true;
    const artist = await this.dataArtistService.byIds({
      ids: [id]
    });
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
        id: artist.results[0].id,
        type: RelationEntityType.artist
      },
      relType: RelationType.follows
    });
  }

  async following(
    dto: ArtistFollowingDto,
    id: number
  ): Promise<PaginationResultDto<ArtistDto>> {
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

    return this.dataArtistService.byIds({
      ids: relates.results.map(value => value.id)
    });
  }

  // TODO: mixSongs
  async songs(dto: DataArtistSongsDto): Promise<PaginationResultDto<SongDto>> {
    return this.dataArtistService.songs(dto);
  }

  // TODO: mixSongs
  async songsTop(
    dto: DataArtistSongsTopDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataArtistService.songsTop(dto);
  }

  // TODO: mixArtists
  async trending(
    dto: DataArtistTrendingDto
  ): Promise<PaginationResultDto<ArtistDto>> {
    return this.dataArtistService.trending(dto);
  }

  // TODO: mixArtists
  async trendingGenre(
    dto: ArtistTrendingGenreDto
  ): Promise<PaginationResultDto<ArtistDto>> {
    return this.dataArtistService.trendingGenre(dto);
  }

  async unfollow(dto: ArtistUnfollowDto, sub: number): Promise<boolean> {
    return this.relationService.remove({
      entityDto1: {
        id: sub,
        type: RelationEntityType.user,
        // TODO: remove key
        key: ""
      },
      entityDto2: {
        id: dto.id,
        type: RelationEntityType.artist,
        // TODO: remove key
        key: ""
      },
      relType: RelationType.unfollows
    });
  }
}
