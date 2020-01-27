import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { Document } from "mongoose";

export class Playlist extends Document {
  constructor(
    downloads_count: number,
    followers_count: number,
    id: string,
    owner_user_id: string,
    photo_id: string,
    isPublic: boolean,
    release_date: Date,
    songs_ids: string,
    title: string,
    tracks_count: number
  ) {
    super();
    this.downloads_count = downloads_count;
    this.followers_count = followers_count;
    this.id = id;
    this.owner_user_id = owner_user_id;
    this.photo_id = photo_id;
    this.isPublic = isPublic;
    this.release_date = release_date;
    this.songs_ids = songs_ids;
    this.title = title;
    this.tracks_count = tracks_count;
  }

  @ApiProperty({
    description: "Number of downloads",
    example: 0
  })
  @IsNumber()
  downloads_count: number;

  @ApiProperty({
    description: "Number of followers",
    example: 0
  })
  @IsNumber()
  followers_count: number;

  @ApiProperty({
    description: "The playlist id",
    example: "abcde"
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The playlist's owner id",
    example: "abcde"
  })
  @IsString()
  owner_user_id: string;

  @ApiProperty({
    description: "The playlist's photo id",
    example: "abcde"
  })
  @IsString()
  photo_id: string;

  @ApiProperty({
    description: "The playlist's accessibility",
    example: true
  })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({
    description: "Playlist's release date",
    example: new Date()
  })
  @IsDate()
  release_date: Date;

  @ApiProperty({
    description: "The playlist id",
    example: "abcde"
  })
  @IsString()
  songs_ids: string;

  @ApiProperty({
    description: "The playlist's title",
    example: "abcde"
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "Number of downloads",
    example: 0
  })
  @IsNumber()
  tracks_count: number;
}
