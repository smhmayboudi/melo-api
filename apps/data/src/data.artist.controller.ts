import {
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  DATA_ARTIST_SERVICE_GET,
  DATA_ARTIST_SERVICE_GET_BY_IDS,
  DATA_ARTIST_SERVICE_TRENDING,
  DATA_ARTIST_SERVICE_TRENDING_GENRE,
  DataPaginationResDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { DataArtistService } from "./data.artist.service";

@Controller()
export class DataArtistController {
  constructor(private readonly dataArtistService: DataArtistService) {}

  @MessagePattern(DATA_ARTIST_SERVICE_GET)
  get(@Payload() dto: ArtistGetReqDto): Promise<ArtistResDto> {
    return this.dataArtistService.get(dto);
  }

  @MessagePattern(DATA_ARTIST_SERVICE_GET_BY_IDS)
  getByIds(
    @Payload() dto: ArtistGetByIdsReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>> {
    return this.dataArtistService.getByIds(dto);
  }

  @MessagePattern(DATA_ARTIST_SERVICE_TRENDING)
  trending(
    dto: ArtistTrendingReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>> {
    return this.dataArtistService.trending(dto);
  }

  @MessagePattern(DATA_ARTIST_SERVICE_TRENDING_GENRE)
  trendingGenre(
    @Payload() dto: ArtistTrendingGenreReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>> {
    return this.dataArtistService.trendingGenre(dto);
  }
}
