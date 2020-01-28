import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataConfigService } from "./data.config.service";
import { DataSearchMoodReqDto } from "./dto/req/data.search.mood.req.dto";
import { DataSearchQueryReqDto } from "./dto/req/data.search.query.req.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchMusicResDto } from "./dto/res/data.search-music.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";

@Injectable()
export class DataSearchService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataConfigService: DataConfigService
  ) {}

  async query(
    dto: DataSearchQueryReqDto
  ): Promise<DataPaginationResDto<DataSearchMusicResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/search/query/${dto.query}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (
            value: AxiosResponse<DataPaginationResDto<DataSearchMusicResDto>>
          ) => {
            return value.data;
          }
        )
      )
      .toPromise();
  }

  async mood(
    dto: DataSearchMoodReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/search/mood/${dto.from}/${dto.limit}`,
        {
          params: {
            date: dto.date,
            classy: dto.classy,
            energetic: dto.energetic,
            happiness: dto.happiness,
            romantic: dto.romantic
          }
        }
      )
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}
