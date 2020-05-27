import { IsArray, IsBoolean, IsString, ValidateNested } from "class-validator";

import { ApiHideProperty } from "@nestjs/swagger";
import { DataImageTypeSize } from "../../data.image-type-size";
import { SignatureSize } from "imgproxy/dist/types";
import { Type } from "class-transformer";

export class DataConfigImageReqDto {
  constructor(
    imageBaseUrl: string,
    imageEncode: boolean,
    imageKey: string,
    imageSalt: string,
    imageSignatureSize: SignatureSize,
    imageTypeSize: DataImageTypeSize[]
  ) {
    this.imageBaseUrl = imageBaseUrl;
    this.imageEncode = imageEncode;
    this.imageKey = imageKey;
    this.imageSalt = imageSalt;
    this.imageSignatureSize = imageSignatureSize;
    this.imageTypeSize = imageTypeSize;
  }

  @ApiHideProperty()
  @IsString()
  readonly imageBaseUrl: string;

  @ApiHideProperty()
  @IsBoolean()
  readonly imageEncode: boolean;

  @ApiHideProperty()
  @IsString()
  readonly imageKey: string;

  @ApiHideProperty()
  @IsString()
  readonly imageSalt: string;

  @ApiHideProperty()
  // TODO: check it
  // @Type(() => SignatureSize)
  // @ValidateNested()
  readonly imageSignatureSize: SignatureSize;

  @ApiHideProperty()
  @IsArray()
  @Type(() => DataImageTypeSize)
  @ValidateNested({
    each: true,
  })
  readonly imageTypeSize: DataImageTypeSize[];
}
