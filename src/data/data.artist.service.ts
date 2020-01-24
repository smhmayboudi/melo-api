import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataConfigService } from "./data.config.service";
import { AlbumDto } from "./dto/album.dto";
import { ArtistDto } from "./dto/artist.dto";
import { DataArtistAlbumsDto } from "./dto/data.artist.albums.dto";
import { DataArtistByIdDto } from "./dto/data.artist.by.id.dto";
import { DataArtistByIdsDto } from "./dto/data.artist.by.ids.dto";
import { DataArtistSongsDto } from "./dto/data.artist.songs.dto";
import { DataArtistSongsTopDto } from "./dto/data.artist.songs.top.dto";
import { DataArtistTrendingDto } from "./dto/data.artist.trending.dto";
import { DataArtistTrendingGenreDto } from "./dto/data.artist.trending.genre.dto";
import { PaginationResultDto } from "./dto/pagination.result.dto";
import { SongDto } from "./dto/song.dto";

@Injectable()
export class DataArtistService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataConfigService: DataConfigService
  ) {}

  async albums(
    dto: DataArtistAlbumsDto
  ): Promise<PaginationResultDto<AlbumDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/artist/albums/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<AlbumDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async byId(dto: DataArtistByIdDto): Promise<ArtistDto> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/artist/byId/${dto.artistId}`)
      .pipe(
        map((value: AxiosResponse<ArtistDto>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async byIds(
    dto: DataArtistByIdsDto
  ): Promise<PaginationResultDto<ArtistDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/artist/byIds`, {
        params: {
          artistsIds: dto.artistsIds
        }
      })
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<ArtistDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async songs(dto: DataArtistSongsDto): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/artist/songs/${dto.artistId}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async songsTop(
    dto: DataArtistSongsTopDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/artist/songs/top/${dto.artistId}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async trending(
    _dto: DataArtistTrendingDto
  ): Promise<PaginationResultDto<ArtistDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/artist/trending`)
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<ArtistDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async trendingGenre(
    dto: DataArtistTrendingGenreDto
  ): Promise<PaginationResultDto<ArtistDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/artist/trending/genre/${dto.genre}`)
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<ArtistDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}
