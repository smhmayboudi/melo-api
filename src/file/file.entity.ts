import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "files", orderBy: { id: "ASC" } })
export class FileEntity {
  constructor(
    created_at: Date,
    bucket: string,
    e_tag: string,
    file_name: string,
    id: number,
    mime_type: string,
    owner_user_id: number,
    size: number
  ) {
    this.created_at = created_at;
    this.bucket = bucket;
    this.e_tag = e_tag;
    this.file_name = file_name;
    this.id = id;
    this.mime_type = mime_type;
    this.owner_user_id = owner_user_id;
    this.size = size;
  }

  @ApiProperty({
    description: "The file identification",
    example: "abcdef"
  })
  @Column({ length: 200, type: "varchar" })
  @Exclude()
  @IsString()
  bucket: string;

  @ApiProperty({
    description: "The create date",
    example: new Date()
  })
  @Column({ type: "date" })
  @IsDate()
  created_at: Date;

  @ApiProperty({
    description: "The file name",
    example: "abcdef"
  })
  @Column({ length: 200, type: "varchar" })
  @IsString()
  file_name: string;

  @ApiProperty({
    description: "The etag",
    example: "abcdef"
  })
  @Column({ length: 200, type: "varchar" })
  @IsString()
  e_tag: string;

  @ApiProperty({
    description: "The primary key",
    example: 0
  })
  @PrimaryGeneratedColumn("increment", { type: "int" })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "The mimetype",
    example: "abcdef"
  })
  @Column({ length: 50, type: "varchar" })
  @IsString()
  mime_type: string;

  @ApiProperty({
    description: "The size",
    example: "1024"
  })
  @Column({ type: "int" })
  @IsNumber()
  owner_user_id: number;

  @ApiProperty({
    description: "The size",
    example: "1024"
  })
  @Column({ type: "int" })
  @IsNumber()
  size: number;
}
