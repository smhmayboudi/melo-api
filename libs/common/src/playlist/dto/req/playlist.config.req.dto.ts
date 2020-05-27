import { ApiHideProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PlaylistConfigReqDto {
  constructor(imagePath: string, imagePathDefaultPlaylist: string) {
    this.imagePath = imagePath;
    this.imagePathDefaultPlaylist = imagePathDefaultPlaylist;
  }

  @ApiHideProperty()
  @IsString()
  readonly imagePath: string;

  @ApiHideProperty()
  @IsString()
  readonly imagePathDefaultPlaylist: string;
}
