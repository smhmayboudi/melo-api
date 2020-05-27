import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";

import { DataConfigImageReqDto } from "../../../data/dto/req/data.config-image.req.dto";
import { Type } from "class-transformer";

export class DataImageReqDto {
  constructor(dataConfigImage: DataConfigImageReqDto, uri: string) {
    this.dataConfigImage = dataConfigImage;
    this.uri = uri;
  }

  @ApiHideProperty()
  @Type(() => DataConfigImageReqDto)
  @ValidateNested()
  readonly dataConfigImage: DataConfigImageReqDto;

  @ApiProperty({
    description: "The uri",
    example: "abcdef",
  })
  @IsString()
  readonly uri: string;
}
