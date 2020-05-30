import { IsNumber, IsString } from "class-validator";

import { ApiHideProperty } from "@nestjs/swagger";

export class DataConfigElasticsearchReqDto {
  constructor(
    imagePath: string,
    imagePathDefaultAlbum: string,
    imagePathDefaultArtist: string,
    imagePathDefaultSong: string,
    indexName: string,
    maxSize: number,
    mp3Endpoint: string
  ) {
    this.imagePath = imagePath;
    this.imagePathDefaultAlbum = imagePathDefaultAlbum;
    this.imagePathDefaultArtist = imagePathDefaultArtist;
    this.imagePathDefaultSong = imagePathDefaultSong;
    this.indexName = indexName;
    this.maxSize = maxSize;
    this.mp3Endpoint = mp3Endpoint;
  }

  @ApiHideProperty()
  @IsString()
  readonly imagePath: string;

  @ApiHideProperty()
  @IsString()
  readonly imagePathDefaultAlbum: string;

  @ApiHideProperty()
  @IsString()
  readonly imagePathDefaultArtist: string;

  @ApiHideProperty()
  @IsString()
  readonly imagePathDefaultSong: string;

  @ApiHideProperty()
  @IsString()
  readonly indexName: string;

  @ApiHideProperty()
  @IsNumber()
  readonly maxSize: number;

  @ApiHideProperty()
  @IsString()
  readonly mp3Endpoint: string;
}
