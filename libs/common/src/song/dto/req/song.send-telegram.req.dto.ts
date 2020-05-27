import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, ValidateNested } from "class-validator";

import { SongConfigReqDto } from "./song.config.req.dto";
import { Type } from "class-transformer";

export class SongSendTelegramReqDto {
  constructor(config: SongConfigReqDto, id: number, sub: number) {
    this.config = config;
    this.id = id;
    this.sub = sub;
  }

  @ApiHideProperty()
  @Type(() => SongConfigReqDto)
  @ValidateNested()
  readonly config: SongConfigReqDto;

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsNumberString()
  readonly id: number;

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
