import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";
import {
  SEARCH_SERVICE,
  SEARCH_SERVICE_MOOD,
  SEARCH_SERVICE_QUERY,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";

import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";
import { SearchServiceInterface } from "./search.service.interface";

@Injectable()
// @PromInstanceCounter
export class SearchService implements SearchServiceInterface {
  constructor(
    @Inject(SEARCH_SERVICE) private readonly searchClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async query(dto: SearchQueryReqDto): Promise<SearchResDto[]> {
    return this.searchClientProxy
      .send<SearchResDto[], SearchQueryReqDto>(SEARCH_SERVICE_QUERY, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(dto: SearchMoodReqDto): Promise<SongResDto[]> {
    return this.searchClientProxy
      .send<SongResDto[], SearchMoodReqDto>(SEARCH_SERVICE_MOOD, dto)
      .toPromise();
  }
}
