import { ApiHideProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ConstConfigReqDto {
  constructor(staticImagePaths: { [key: string]: string }) {
    this.staticImagePaths = staticImagePaths;
  }

  @ApiHideProperty()
  @IsString()
  readonly staticImagePaths: { [key: string]: string };
}
