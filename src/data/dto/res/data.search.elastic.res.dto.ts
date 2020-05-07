import { DataArtistElasticResDto } from "./data.artist.elastic.res.dto";

export class DataSearchElasticResDto {
  constructor(
    album: string,
    artist_followers_count: number,
    artist_full_name: string,
    artist_id: number,
    artists: DataArtistElasticResDto[],
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
  album_downloads_count?: number;
  album_id?: number;
  album_tracks_count?: number;
  album: string;
  artist_followers_count: number;
  artist_full_name: string;
  artist_id: number;
  artist_sum_downloads_count?: number;
  artists: DataArtistElasticResDto[];
  copyright?: boolean;
  downloads_count?: number;
  duration: number;
  has_cover?: boolean;
  has_video?: boolean;
  id: number;
  localize?: boolean;
  lyrics?: string;
  max_audio_rate: number;
  release_date: Date;
  suggested?: number;
  tags?: { tag: string }[];
  title?: string;
  type: string;
  unique_name?: string;
}
