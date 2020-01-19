import { Injectable } from "@nestjs/common";
import { ArtistAlbumsDto } from "./dto/artist.albums.dto";
import { ArtistByIdDto } from "./dto/artist.by.id.dto";
import { ArtistFollowDto } from "./dto/artist.follow.dto";
import { ArtistFollowingDto } from "./dto/artist.following.dto";
import { ArtistSongsDto } from "./dto/artist.songs.dto";
import { ArtistSongsTopDto } from "./dto/artist.songs.top.dto";
import { ArtistTrendingDto } from "./dto/artist.trending.dto";
import { ArtistTrendingGenreDto } from "./dto/artist.trending.genre.dto";
import { ArtistUnfollowDto } from "./dto/artist.unfollow.dto";

@Injectable()
export class ArtistService {
  // constructor() {}

  async albums(dto: ArtistAlbumsDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async byId(dto: ArtistByIdDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async follow(dto: ArtistFollowDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async following(dto: ArtistFollowingDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async songs(dto: ArtistSongsDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async songsTop(dto: ArtistSongsTopDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async trending(dto: ArtistTrendingDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async trendingGenre(dto: ArtistTrendingGenreDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async unfollow(dto: ArtistUnfollowDto): Promise<any> {
    return Promise.resolve(dto);
  }
}
