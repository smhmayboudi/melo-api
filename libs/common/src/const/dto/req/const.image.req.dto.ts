import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";

import { DataConfigImageReqDto } from "../../../common/dto/req/common.config-image.req.dto";
import { Type } from "class-transformer";

export class ConstImageReqDto {
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
