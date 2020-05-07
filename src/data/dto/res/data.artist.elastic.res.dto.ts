import { DataArtistType } from "../../data.artist.type";

export class DataArtistElasticResDto {
  constructor(
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

  available: boolean;
  followers_count: number;
  full_name: string;
  has_cover: boolean;
  id: number;
  popular: boolean;
  sum_downloads_count: number;
  type: DataArtistType;
  tags?: { tag: string }[];
}
