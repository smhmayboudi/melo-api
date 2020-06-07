import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ConstImageReqDto {
  constructor(uri: string) {
    this.uri = uri;
  }

  @ApiProperty({
    description: "The uri",
    example: "abcdef",
  })
  @IsString()
  readonly uri: string;
}
