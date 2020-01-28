import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataConfigService } from "./data.config.service";
import { AlbumDto } from "./dto/album.dto";
import { ArtistDto } from "./dto/artist.dto";
import { DataArtistAlbumsDto } from "./dto/data.artist.albums.dto";
import { DataArtistByIdsDto } from "./dto/data.artist.by.ids.dto";
import { DataArtistSongsDto } from "./dto/data.artist.songs.dto";
import { DataArtistSongsTopDto } from "./dto/data.artist.songs.top.dto";
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

  async byId(id: number): Promise<ArtistDto> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/artist/byId/${id}`)
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
          artistsIds: dto.ids
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
        `${this.dataConfigService.uri}/artist/songs/${dto.id}/${dto.from}/${dto.limit}`
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
        `${this.dataConfigService.uri}/artist/songs/top/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async trending(): Promise<PaginationResultDto<ArtistDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/artist/trending`)
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<ArtistDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async trendingGenre(genre: string): Promise<PaginationResultDto<ArtistDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/artist/trending/genre/${genre}`)
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<ArtistDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}
