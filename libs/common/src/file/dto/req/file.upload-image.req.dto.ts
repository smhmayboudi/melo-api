import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

import { Type } from "class-transformer";

export class FileUploadImageReqDto {
  constructor(
    bufferBase64: string,
    encoding: string,
    fieldname: string,
    mimeType: string,
    originalname: string,
    size: number,
    sub: number,
    buffer?: Buffer
  ) {
    this.bufferBase64 = bufferBase64;
    this.encoding = encoding;
    this.fieldname = fieldname;
    this.mimeType = mimeType;
    this.originalname = originalname;
    this.size = size;
    this.sub = sub;
    this.buffer = buffer;
  }

  @ApiProperty({
    description: "File Buffer in base64",
    example: "",
  })
  @IsString()
  readonly bufferBase64: string;

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

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;

  @ApiProperty({
    description: "File Buffer",
    example: "<>",
  })
  @IsOptional()
  @Type(() => Buffer)
  readonly buffer?: Buffer;
}
