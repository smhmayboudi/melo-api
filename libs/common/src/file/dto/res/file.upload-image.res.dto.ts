import { IsDate, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class FileUploadImageResDto {
  constructor(
    createdAt: Date,
    fileKey: string,
    mimeType: string,
    originalname: string,
    size: number
  ) {
    this.createdAt = createdAt;
    this.fileKey = fileKey;
    this.mimeType = mimeType;
    this.originalname = originalname;
    this.size = size;
  }

  @ApiProperty({
    description: "The creation date",
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  readonly createdAt: Date;

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsString()
  readonly fileKey: string;

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
