import { Injectable } from "@nestjs/common";
import { ArtistFollowDto } from "./dto/artist.follow.dto";
import { ArtistFollowingDto } from "./dto/artist.following.dto";
import { ArtistTrendingGenreDto } from "./dto/artist.trending.genre.dto";
import { ArtistUnfollowDto } from "./dto/artist.unfollow.dto";
import { AlbumDto } from "../data/dto/album.dto";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistAlbumsDto } from "../data/dto/data.artist.albums.dto";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { DataArtistByIdDto } from "src/data/dto/data.artist.by.id.dto";
import { ArtistDto } from "src/data/dto/artist.dto";
import { RelationService } from "src/relation/relation.service";
import { RelationType } from "src/relation/type/relation.type";
import { DataArtistSongsDto } from "src/data/dto/data.artist.songs.dto";
import { SongDto } from "src/data/dto/song.dto";
import { DataArtistSongsTopDto } from "src/data/dto/data.artist.songs.top.dto";
import { DataArtistTrendingDto } from "src/data/dto/data.artist.trending.dto";

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

  async byId(dto: DataArtistByIdDto): Promise<ArtistDto> {
    return this.dataArtistService.byId(dto);
  }

  async follow(dto: ArtistFollowDto, sub: number): Promise<boolean> {
    const artist = await this.dataArtistService.byIds({
      ids: [dto.id]
    });
    return this.relationService.set({
      createdAt: new Date(),
      entityDto1: {
        // TODO: remove key
        key: "",
        id: sub,
        type: "user"
      },
      entityDto2: {
        // TODO: remove key
        key: "",
        id: artist.results[0].id,
        type: "artist"
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
        type: "following"
      },
      limit: dto.limit,
      relType: RelationType.follows
    });

    return this.dataArtistService.byIds({
      ids: relates.results.map(value => value.id)
    });
  }

  async songs(dto: DataArtistSongsDto): Promise<PaginationResultDto<SongDto>> {
    return this.dataArtistService.songs(dto);
  }

  async songsTop(
    dto: DataArtistSongsTopDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataArtistService.songsTop(dto);
  }

  async trending(
    dto: DataArtistTrendingDto
  ): Promise<PaginationResultDto<ArtistDto>> {
    return this.dataArtistService.trending(dto);
  }

  async trendingGenre(
    dto: ArtistTrendingGenreDto
  ): Promise<PaginationResultDto<ArtistDto>> {
    return this.dataArtistService.trendingGenre(dto);
  }

  async unfollow(dto: ArtistUnfollowDto, sub: number): Promise<boolean> {
    return this.relationService.remove({
      entityDto1: {
        id: sub,
        type: "user",
        // TODO: remove key
        key: ""
      },
      entityDto2: {
        id: dto.id,
        type: "artist",
        // TODO: remove key
        key: ""
      },
      relType: RelationType.unfollows
    });
  }
}
