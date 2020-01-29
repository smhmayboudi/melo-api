import { Document } from "mongoose";

export interface Playlist extends Document {
  downloads_count: number;
  followers_count: number;
  id: string;
  owner_user_id: string;
  photo_id: string;
  isPublic: boolean;
  release_date: Date;
  songs_ids: number[];
  title: string;
  tracks_count: number;
}
// import { ApiProperty } from "@nestjs/swagger";
// import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
// import { Document } from "mongoose";
// import { Expose, Exclude } from "class-transformer";

// export class Playlist extends Document {
//   constructor(
//     downloads_count: number,
//     followers_count: number,
//     id: string,
//     isPublic: boolean,
//     owner_user_id: string,
//     photo_id: string,
//     release_date: Date,
//     songs_ids: string,
//     title: string,
//     tracks_count: number
//   ) {
//     super();
//     this.downloads_count = downloads_count;
//     this.followers_count = followers_count;
//     this.id = id;
//     this.isPublic = isPublic;
//     this.owner_user_id = owner_user_id;
//     this.photo_id = photo_id;
//     this.release_date = release_date;
//     this.songs_ids = songs_ids;
//     this.title = title;
//     this.tracks_count = tracks_count;
//   }

//   @ApiProperty({
//     description: "Number of downloads",
//     example: 0
//   })
//   @Exclude()
//   @IsNumber()
//   downloads_count: number;

//   @ApiProperty({
//     description: "Number of followers",
//     example: 0
//   })
//   @Expose({ name: "followersCount" })
//   @IsNumber()
//   followers_count: number;

//   @ApiProperty({
//     description: "The playlist id",
//     example: "abcde"
//   })
//   @IsString()
//   id: string;

//   @ApiProperty({
//     description: "The playlist's accessibility",
//     example: false
//   })
//   @IsBoolean()
//   isPublic: boolean;

//   @ApiProperty({
//     description: "The playlist's owner id",
//     example: "abcde"
//   })
//   @Exclude()
//   @IsString()
//   owner_user_id: string;

//   @ApiProperty({
//     description: "The playlist's photo id",
//     example: "abcde"
//   })
//   @Expose({ name: "image" })
//   @IsString()
//   photo_id: string;

//   @ApiProperty({
//     description: "Playlist's release date",
//     example: new Date()
//   })
//   @Expose({ name: "releaseDate" })
//   @IsDate()
//   release_date: Date;

//   @ApiProperty({
//     description: "The playlist id",
//     example: "abcde"
//   })
//   @Expose({ name: "songs" })
//   @IsString()
//   songs_ids: string;

//   @ApiProperty({
//     description: "The playlist's title",
//     example: "abcde"
//   })
//   @IsString()
//   title: string;

//   @ApiProperty({
//     description: "Number of downloads",
//     example: 0
//   })
//   @Expose({ name: "tracksCount" })
//   @IsNumber()
//   tracks_count: number;
// }
