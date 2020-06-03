import { ApiHideProperty } from "@nestjs/swagger";
import { ConstConfigReqDto } from "./const.config.req.dto";
import { DataConfigImageReqDto } from "../../../common/dto/req/common.config-image.req.dto";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class ConstImagesReqDto {
  constructor(
    config: ConstConfigReqDto,
    dataConfigImage: DataConfigImageReqDto
  ) {
    this.config = config;
    this.dataConfigImage = dataConfigImage;
  }

  @ApiHideProperty()
  @Type(() => ConstConfigReqDto)
  @ValidateNested()
  readonly config: ConstConfigReqDto;

  @ApiHideProperty()
  @Type(() => DataConfigImageReqDto)
  @ValidateNested()
  readonly dataConfigImage: DataConfigImageReqDto;
}
