import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "files", orderBy: { id: "ASC" } })
export class FileEntity {
  constructor(
    created_at: Date,
    file_id: string,
    file_name: string,
    id: number,
    mime_type: string,
    owner_user_id: number,
    size: number
  ) {
    this.created_at = created_at;
    this.file_id = file_id;
    this.file_name = file_name;
    this.id = id;
    this.mime_type = mime_type;
    this.owner_user_id = owner_user_id;
    this.size = size;
  }

  @ApiProperty({
    description: "The create date",
    example: new Date()
  })
  @Column({ type: "date" })
  @IsDate()
  created_at: Date;

  @ApiProperty({
    description: "The file identification",
    example: "abcdef"
  })
  @Column({ length: 200, type: "varchar" })
  @IsString()
  file_id: string;

  @ApiProperty({
    description: "The file name",
    example: "abcdef"
  })
  @Column({ length: 200, type: "varchar" })
  @IsString()
  file_name: string;

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
