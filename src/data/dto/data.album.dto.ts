import { IsNumber } from "class-validator";

export class DataAlbumDto {
  constructor(albumId: number) {
    this.albumId = albumId;
  }

  @IsNumber()
  albumId: number;
}
