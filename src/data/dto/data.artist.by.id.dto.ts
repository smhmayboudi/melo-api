import { IsNumber } from "class-validator";

export class DataArtistByIdDto {
  constructor(artistId: number) {
    this.artistId = artistId;
  }

  @IsNumber()
  artistId: number;
}
