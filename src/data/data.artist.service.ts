import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { DataConfigService } from "./data.config.service";
import { DataArtistAlbumsDto } from "./dto/data.artist.albums.dto";
import { DataArtistByIdDto } from "./dto/data.artist.by.id.dto";
import { DataArtistByIdsDto } from "./dto/data.artist.by.ids.dto";
import { DataArtistSongsDto } from "./dto/data.artist.songs.dto";
import { DataArtistSongsTopDto } from "./dto/data.artist.songs.top.dto";
import { DataArtistTrendingDto } from "./dto/data.artist.trending.dto";
import { DataArtistTrendingGenreDto } from "./dto/data.artist.trending.genre.dto";
import { Album } from "./type/Album";
import { Artist } from "./type/Artist";
import { PaginationResult } from "./type/PaginationResult";
import { Song } from "./type/Song";

@Injectable()
export class DataArtistService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataConfigService: DataConfigService
  ) {}

  albums(
    dto: DataArtistAlbumsDto
  ): Observable<AxiosResponse<PaginationResult<Album>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/artist/albums/${dto.artistId}/${dto.from}/${dto.limit}`
    );
  }

  byId(dto: DataArtistByIdDto): Observable<AxiosResponse<Artist>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/artist/byId/${dto.artistId}`
    );
  }

  byIds(
    dto: DataArtistByIdsDto
  ): Observable<AxiosResponse<PaginationResult<Artist>>> {
    return this.httpService.get(`${this.dataConfigService.uri}/artist/byIds`, {
      params: {
        artistsIds: dto.artistsIds
      }
    });
  }

  songs(
    dto: DataArtistSongsDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/artist/songs/${dto.artistId}/${dto.from}/${dto.limit}`
    );
  }

  songsTop(
    dto: DataArtistSongsTopDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/artist/songs/top/${dto.artistId}/${dto.from}/${dto.limit}`
    );
  }

  trending(
    _dto: DataArtistTrendingDto
  ): Observable<AxiosResponse<PaginationResult<Artist>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/artist/trending`
    );
  }

  trendingGenre(
    dto: DataArtistTrendingGenreDto
  ): Observable<AxiosResponse<PaginationResult<Artist>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/artist/trending/genre/${dto.genre}`
    );
  }
}
