import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataConfigService } from "./data.config.service";
import { DataSearchMoodDto } from "./dto/data.search.mood.dto";
import { DataSearchQueryDto } from "./dto/data.search.query.dto";
import { PaginationResultDto } from "./dto/pagination.result.dto";
import { SearchMusicDto } from "./dto/search.music.dto";
import { SongDto } from "./dto/song.dto";

@Injectable()
export class DataSearchService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataConfigService: DataConfigService
  ) {}

  async query(
    dto: DataSearchQueryDto
  ): Promise<PaginationResultDto<SearchMusicDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/search/query/${dto.query}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SearchMusicDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async mood(dto: DataSearchMoodDto): Promise<PaginationResultDto<SongDto>> {
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
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}
