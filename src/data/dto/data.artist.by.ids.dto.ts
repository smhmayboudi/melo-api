import { IsArray, IsNumber } from "class-validator";

export class DataArtistByIdsDto {
  constructor(artistsIds: number[]) {
    this.artistsIds = artistsIds;
  }

  @IsArray()
  @IsNumber()
  artistsIds: number[];
}
