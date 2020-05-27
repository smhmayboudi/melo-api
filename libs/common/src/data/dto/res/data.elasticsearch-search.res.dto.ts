import { DataConfigElasticSearchReqDto } from "../req/data.config-elasticsearch.req.dto";
import { DataConfigImageReqDto } from "../req/data.config-image.req.dto";
import { DataElasticSearchArtistResDto } from "./data.elasticsearch-artist.res.dto";

export class DataElasticSearchSearchResDto {
  constructor(
    dataConfigElasticSearch: DataConfigElasticSearchReqDto,
    dataConfigImage: DataConfigImageReqDto,
    album: string,
    artist_followers_count: number,
    artist_full_name: string,
    artist_id: number,
    artists: DataElasticSearchArtistResDto[],
    duration: number,
    id: number,
    max_audio_rate: number,
    release_date: Date,
    type: string,
    album_downloads_count?: number,
    album_id?: number,
    album_tracks_count?: number,
    artist_sum_downloads_count?: number,
    copyright?: boolean,
    downloads_count?: number,
    has_cover?: boolean,
    has_video?: boolean,
    localize?: boolean,
    lyrics?: string,
    suggested?: number,
    tags?: { tag: string }[],
    title?: string,
    unique_name?: string
  ) {
    this.dataConfigElasticSearch = dataConfigElasticSearch;
    this.dataConfigImage = dataConfigImage;
    this.album = album;
    this.album_downloads_count = album_downloads_count;
    this.album_id = album_id;
    this.album_tracks_count = album_tracks_count;
    this.artist_followers_count = artist_followers_count;
    this.artist_full_name = artist_full_name;
    this.artist_id = artist_id;
    this.artist_sum_downloads_count = artist_sum_downloads_count;
    this.artists = artists;
    this.copyright = copyright;
    this.downloads_count = downloads_count;
    this.duration = duration;
    this.has_cover = has_cover;
    this.has_video = has_video;
    this.id = id;
    this.localize = localize;
    this.lyrics = lyrics;
    this.max_audio_rate = max_audio_rate;
    this.release_date = release_date;
    this.suggested = suggested;
    this.tags = tags;
    this.title = title;
    this.type = type;
    this.unique_name = unique_name;
  }
  readonly dataConfigElasticSearch: DataConfigElasticSearchReqDto;
  readonly dataConfigImage: DataConfigImageReqDto;
  readonly album: string;
  readonly album_downloads_count?: number;
  readonly album_id?: number;
  readonly album_tracks_count?: number;
  readonly artist_followers_count: number;
  readonly artist_full_name: string;
  readonly artist_id: number;
  readonly artist_sum_downloads_count?: number;
  readonly artists: DataElasticSearchArtistResDto[];
  readonly copyright?: boolean;
  readonly downloads_count?: number;
  readonly duration: number;
  readonly has_cover?: boolean;
  readonly has_video?: boolean;
  readonly id: number;
  readonly localize?: boolean;
  readonly lyrics?: string;
  readonly max_audio_rate: number;
  readonly release_date: Date;
  readonly suggested?: number;
  readonly tags?: { tag: string }[];
  readonly title?: string;
  readonly type: string;
  readonly unique_name?: string;
}
