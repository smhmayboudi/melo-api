import { Injectable } from "@nestjs/common";
import { SearchMoodDto } from "./dto/search.mood.dto";
import { SearchQueryDto } from "./dto/search.query.dto";

@Injectable()
export class SearchService {
  // constructor() {}

  async mood(dto: SearchMoodDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async query(dto: SearchQueryDto): Promise<any> {
    return Promise.resolve(dto);
  }
}
