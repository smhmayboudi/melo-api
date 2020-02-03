import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataConfigService } from "./data.config.service";
import { DataArtistAlbumsReqDto } from "./dto/req/data.artist.albums.req.dto";
import { DataArtistByIdReqDto } from "./dto/req/data.artist.by-id.req.dto";
import { DataArtistByIdsReqDto } from "./dto/req/data.artist.by.ids.req.dto";
import { DataArtistSongsTopReqDto } from "./dto/req/data.artist.songs-top.req.dto";
import { DataArtistSongsReqDto } from "./dto/req/data.artist.songs.req.dto";
import { DataTrendingGenreReqDto } from "./dto/req/data.trending-genre.req.dto";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";

@Injectable()
export class DataArtistService {
  constructor(
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  // TODO: move to Album Service
  async albums(
    dto: DataArtistAlbumsReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.url}/artist/albums/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataAlbumResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async byId(dto: DataArtistByIdReqDto): Promise<DataArtistResDto> {
    return this.httpService
      .get(`${this.dataConfigService.url}/artist/byId/${dto.id}`)
      .pipe(map((value: AxiosResponse<DataArtistResDto>) => value.data))
      .toPromise();
  }

  async byIds(
    dto: DataArtistByIdsReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.httpService
      .get(`${this.dataConfigService.url}/artist/byIds`, {
        params: {
          artistsIds: dto.ids
        }
      })
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataArtistResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  // TODO: move to Song Service
  async songs(
    dto: DataArtistSongsReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.url}/artist/songs/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  // TODO: move to Song Service
  async songsTop(
    dto: DataArtistSongsTopReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.url}/artist/songs/top/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async trending(): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.httpService
      .get(`${this.dataConfigService.url}/artist/trending`)
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataArtistResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async trendingGenre(
    dto: DataTrendingGenreReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.httpService
      .get(`${this.dataConfigService.url}/artist/trending/genre/${dto.genre}`)
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataArtistResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }
}
