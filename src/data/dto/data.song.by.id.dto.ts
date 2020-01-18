import { IsNumber } from "class-validator";

export class DataSongByIdDto {
  constructor(id: number) {
    this.id = id;
  }

  @IsNumber()
  id: number;
}
