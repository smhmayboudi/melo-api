import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsNumber } from "class-validator";

export class FileUploadImageDto {
  constructor(createdAt: Date, fileId: string, mimetype: string, size: number, buffer: Buffer, originalname: string) {
    this.createdAt = createdAt;
    this.fileId = fileId;
    this.mimetype = mimetype;
    this.size = size;
    this.buffer = buffer;
    this.originalname = originalname
  }

  @ApiProperty({
    description: "The create date",
    example: new Date()
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "The file identification",
    example: "abcdef"
  })
  @IsString()
  fileId: string;

  @ApiProperty({
    description: "The mimetype",
    example: "image/jpeg"
  })
  @IsString()
  mimetype: string;

  @ApiProperty({
    description: "The size",
    example: 0
  })
  @IsNumber()
  size: number;

  @ApiProperty({
    description: "File Buffer",
    example: "<>"
  })
  buffer: Buffer

  @ApiProperty({
    description: "File orginal name",
    example: "pic.png"
  })
  originalname: string
}
