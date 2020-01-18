import { IsArray, IsNumber } from "class-validator";

export class DataSongByIdsDto {
  constructor(ids: number[]) {
    this.ids = ids;
  }

  @IsArray()
  @IsNumber()
  ids: number[];
}
