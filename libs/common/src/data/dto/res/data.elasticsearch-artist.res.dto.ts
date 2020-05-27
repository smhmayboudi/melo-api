import { DataArtistType } from "../../data.artist.type";
import { DataConfigElasticSearchReqDto } from "../req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../req/data.config-image.req.dto";

export class DataElasticSearchArtistResDto {
  constructor(
    dataConfigElasticSearch: DataConfigElasticSearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    available: boolean,
    followers_count: number,
    full_name: string,
    has_cover: boolean,
    id: number,
    popular: boolean,
    sum_downloads_count: number,
    type: DataArtistType,
    tags?: { tag: string }[]
  ) {
    this.dataConfigElasticSearch = dataConfigElasticSearch;
    this.dataConfigImage = dataConfigImage;
    this.available = available;
    this.followers_count = followers_count;
    this.full_name = full_name;
    this.has_cover = has_cover;
    this.id = id;
    this.popular = popular;
    this.sum_downloads_count = sum_downloads_count;
    this.type = type;
    this.tags = tags;
  }
  readonly dataConfigElasticSearch: DataConfigElasticSearchReqDto;
  readonly dataConfigImage: DataConfigImageReqDto;
  readonly available: boolean;
  readonly followers_count: number;
  readonly full_name: string;
  readonly has_cover: boolean;
  readonly id: number;
  readonly popular: boolean;
  readonly sum_downloads_count: number;
  readonly type: DataArtistType;
  readonly tags?: { tag: string }[];
}
