import { Injectable } from "@nestjs/common";
import { DataArtistService } from "../data/data.artist.service";
import { AlbumDto } from "../data/dto/album.dto";
import { ArtistDto } from "../data/dto/artist.dto";
import { DataArtistAlbumsDto } from "../data/dto/data.artist.albums.dto";
import { DataArtistSongsDto } from "../data/dto/data.artist.songs.dto";
import { DataArtistSongsTopDto } from "../data/dto/data.artist.songs.top.dto";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { SongDto } from "../data/dto/song.dto";
import { RelationService } from "../relation/relation.service";
import { RelationEntityType } from "../relation/type/relation.entity.type";
// import { RelationMultiHasDto } from "../relation/dto/relaton.multi.has.dto";
import { RelationType } from "../relation/type/relation.type";

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
  async byId(id: number): Promise<ArtistDto> {
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
    return this.dataArtistService.byId(id);
  }

  // TODO: mixArtists
  async follow(id: number, sub: number): Promise<boolean> {
    // There is no need to mixArtists instead
    // artistDto.follownig = true;
    const artist = await this.dataArtistService.byIds({
      ids: [id]
    });
    return this.relationService.set(
      new Date(),
      {
        // TODO: remove key
        key: "",
        id: sub,
        type: RelationEntityType.user
      },
      {
        // TODO: remove key
        key: "",
        id: artist.results[0].id,
        type: RelationEntityType.artist
      },
      RelationType.follows
    );
  }

  async following(
    from: number,
    limit: number,
    id: number
  ): Promise<PaginationResultDto<ArtistDto>> {
    const relates = await this.relationService.get(
      from,
      {
        id,
        // TODO: remove key
        key: "",
        type: RelationEntityType.following
      },
      limit,
      RelationType.follows
    );

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
  async trending(): Promise<PaginationResultDto<ArtistDto>> {
    return this.dataArtistService.trending();
  }

  // TODO: mixArtists
  async trendingGenre(genre: string): Promise<PaginationResultDto<ArtistDto>> {
    return this.dataArtistService.trendingGenre(genre);
  }

  async unfollow(id: number, sub: number): Promise<boolean> {
    return this.relationService.remove(
      {
        // TODO: remove key
        key: "",
        id: sub,
        type: RelationEntityType.user
      },
      {
        // TODO: remove key
        key: "",
        id,
        type: RelationEntityType.artist
      },
      RelationType.unfollows
    );
  }
}
