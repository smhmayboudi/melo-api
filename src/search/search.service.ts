import { Injectable } from "@nestjs/common";
import { DataSearchService } from "../data/data.search.service";
import { DataSearchMoodDto } from "../data/dto/data.search.mood.dto";
import { DataSearchQueryDto } from "../data/dto/data.search.query.dto";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { SearchMusicDto } from "../data/dto/search.music.dto";
import { SongDto } from "../data/dto/song.dto";

@Injectable()
export class SearchService {
  constructor(private readonly dataSearchService: DataSearchService) {}

  async mood(dto: DataSearchMoodDto): Promise<PaginationResultDto<SongDto>> {
    return this.dataSearchService.mood({
      from: dto.from,
      limit: dto.limit,
      classy: dto.classy,
      date: dto.date,
      energetic: dto.energetic,
      happiness: dto.happiness,
      romantic: dto.romantic
    });
  }

  async query(
    dto: DataSearchQueryDto
  ): Promise<PaginationResultDto<SearchMusicDto>> {
    return this.dataSearchService.query({
      from: dto.from,
      limit: dto.limit,
      query: dto.query
    });
  }
}
