import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class FileFileReqDto {
  constructor(
    buffer: Buffer,
    encoding: string,
    fieldname: string,
    mimeType: string,
    originalname: string,
    size: number
  ) {
    this.buffer = buffer;
    this.encoding = encoding;
    this.fieldname = fieldname;
    this.mimeType = mimeType;
    this.originalname = originalname;
    this.size = size;
  }

  @ApiProperty({
    description: "File Buffer",
    example: "<>",
  })
  readonly buffer: Buffer;

  @ApiProperty({
    description: "File encoding",
    example: "8bit",
  })
  @IsString()
  readonly encoding: string;

  @ApiProperty({
    description: "The file name",
    example: "abcdef",
  })
  @IsString()
  readonly fieldname: string;

  @ApiProperty({
    description: "The content type",
    example: "image/jpeg",
  })
  @IsString()
  readonly mimeType: string;

  @ApiProperty({
    description: "The orginal filename",
    example: "pic.jpg",
  })
  @IsString()
  readonly originalname: string;

  @ApiProperty({
    description: "The size",
    example: "0",
  })
  @IsNumberString()
  readonly size: number;
}
