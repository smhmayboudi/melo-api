import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { DataConfigService } from "./data.config.service";
import { DataSearchMoodDto } from "./dto/data.search.mood.dto";
import { DataSearchQueryDto } from "./dto/data.search.query.dto";
import { SearchMusic } from "./type/SearchMusic";
import { Song } from "./type/Song";

@Injectable()
export class DataSearchService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataConfigService: DataConfigService
  ) {}

  query(dto: DataSearchQueryDto): Observable<AxiosResponse<SearchMusic>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/search/query/${dto.q}/${dto.from}/${dto.limit}`
    );
  }

  mood(dto: DataSearchMoodDto): Observable<AxiosResponse<Song>> {
    return this.httpService.get(
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
    );
  }
}
