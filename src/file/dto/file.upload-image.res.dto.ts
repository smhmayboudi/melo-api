import { IsDate, IsNumber, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

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
  createdAt: Date;

  @ApiProperty({
    description: "The file identification",
    example: "abcdef",
  })
  @IsString()
  fileKey: string;

  @ApiProperty({
    description: "The content type",
    example: "image/jpeg",
  })
  @IsString()
  mimeType: string;

  @ApiProperty({
    description: "The orginal filename",
    example: "pic.jpg",
  })
  @IsString()
  originalname: string;

  @ApiProperty({
    description: "The size",
    example: 0,
  })
  @IsNumber()
  size: number;
}
